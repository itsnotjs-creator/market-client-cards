"use client";

import { useEffect, useState } from "react";
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

export default function RelevantBanner() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelevant = async () => {
      try {
        const data = await productService.getRelevantProducts();
        setProducts(Array.isArray(data?.data) ? data.data : []);
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
          <div className="relevant-banner__scroll">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={260}
                height={160}
                sx={{ borderRadius: 2, flexShrink: 0 }}
              />
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
            return (
              <a
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
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
