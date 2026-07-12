"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { productService } from "../../services/product.service";
import { useConfigStore } from "../../store/configStore";
import { API_BASE_URL } from "../../lib/fetcher";

function getProductImage(files = []) {
  const mainFile = files.find((f) => f.isMain) || files[0];
  if (!mainFile?.file?.url) return null;
  const url = mainFile.file.url;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
}

function getLowestPrice(skus = []) {
  if (!Array.isArray(skus) || skus.length === 0) return null;
  const validSkus = skus.filter((sku) => sku.price != null);
  if (validSkus.length === 0) return null;
  return Math.min(...validSkus.map((s) => s.price));
}

function formatPrice(value) {
  if (value == null) return null;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(value);
}

const AUTOPLAY_INTERVAL = 4000;

export default function RelevantBanner() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const bannerLimit = useConfigStore((state) => state.settings.bannerItemsLimit) || 5;

  useEffect(() => {
    const fetchRelevant = async () => {
      try {
        const data = await productService.getRelevantProducts({
          offset: 0,
          take: bannerLimit,
        });
        const products = Array.isArray(data?.data) ? data.data : [];
        const filtered = products.filter(
          (p) => p.status !== "ARCHIVED" || p.relevantOrder
        );
        setProducts(filtered.length > 0 ? filtered : products);
      } catch (error) {
        console.error("Error loading relevant products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelevant();
  }, [bannerLimit]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  }, [products.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  }, [products.length]);

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused || products.length <= 1) return;

    timerRef.current = setInterval(() => {
      goNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, [paused, products.length, goNext]);

  if (loading) {
    return (
      <section className="relevant-banner">
        <div className="page-shell relevant-banner__inner">
          <Skeleton variant="rectangular" height={380} sx={{ borderRadius: 2 }} />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="relevant-banner">
      <div className="page-shell relevant-banner__inner">
        <div
          className="relevant-banner__slider"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slides track */}
          <div
            className="relevant-banner__track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {products.map((product) => {
              const imageUrl = getProductImage(product.files);
              const price = getLowestPrice(product.skus);

              return (
                <Link
                  key={product.id}
                  href={`/productos/${product.slug}`}
                  className="relevant-banner__slide"
                >
                  <div className="relevant-banner__slide-image-wrapper">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="relevant-banner__slide-img"
                      />
                    ) : (
                      <div className="relevant-banner__slide-placeholder" />
                    )}
                  </div>
                  <div className="relevant-banner__slide-overlay">
                    <div className="relevant-banner__slide-info">
                      <span className="relevant-banner__slide-name">
                        {product.name}
                      </span>
                      {price != null && (
                        <span className="relevant-banner__slide-price">
                          {formatPrice(price)}
                        </span>
                      )}
                      <span className="relevant-banner__slide-cta">
                        Ver producto
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation arrows */}
          {products.length > 1 && (
            <>
              <button
                className="relevant-banner__arrow relevant-banner__arrow--prev"
                onClick={goPrev}
                aria-label="Anterior"
              >
                <ChevronLeftIcon />
              </button>
              <button
                className="relevant-banner__arrow relevant-banner__arrow--next"
                onClick={goNext}
                aria-label="Siguiente"
              >
                <ChevronRightIcon />
              </button>
            </>
          )}

          {/* Dots */}
          {products.length > 1 && (
            <div className="relevant-banner__dots">
              {products.map((_, index) => (
                <button
                  key={index}
                  className={`relevant-banner__dot ${
                    index === current ? "relevant-banner__dot--active" : ""
                  }`}
                  onClick={() => goTo(index)}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}