"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import { productService } from "../../services/product.service";
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

export default function RelevantBanner() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelevant = async () => {
      try {
        const data = await productService.getRelevantProducts();
        const products = Array.isArray(data?.data) ? data.data : [];
        const filtered = products.filter((p) => p.status !== "ARCHIVED" || p.relevantOrder);
        setProducts(filtered.length > 0 ? filtered : products);
      } catch (error) {
        console.error("Error loading relevant products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelevant();
  }, []);

  if (loading) {
    return (
      <section className="relevant-banner">
        <div className="page-shell relevant-banner__inner">
          <h2 className="relevant-banner__title">Productos Destacados</h2>
          <div className="relevant-banner__scroll">
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ flex: "0 0 260px" }}>
                <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2, flexShrink: 0 }} />
                <Skeleton variant="text" height={24} sx={{ mt: 0.5 }} />
                <Skeleton variant="text" width="60%" height={20} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="relevant-banner">
      <div className="page-shell relevant-banner__inner">
        <h2 className="relevant-banner__title">Productos Destacados</h2>
        <div className="relevant-banner__scroll">
          {products.map((product) => {
            const imageUrl = getProductImage(product.files);
            const price = getLowestPrice(product.skus);

            return (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                className="relevant-banner__card"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="relevant-banner__img"
                  />
                ) : (
                  <div className="relevant-banner__img-placeholder" />
                )}
                <div className="relevant-banner__card-info">
                  <span className="relevant-banner__card-name">
                    {product.name}
                  </span>
                  {price != null && (
                    <span className="relevant-banner__card-price">
                      {formatPrice(price)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}