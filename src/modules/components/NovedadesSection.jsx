"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import ProductCard from "./ProductCard";
import { productService } from "../../services/product.service";
import { useConfigStore } from "../../store/configStore";

export default function NovedadesSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const homeLimit = useConfigStore((state) => state.settings.homeProductItemsLimit) || 8;

  useEffect(() => {
    let cancelled = false;

    const fetchNewArrivals = async () => {
      try {
        const data = await productService.getNewArrivals({
          offset: 0,
          take: homeLimit,
        });
        if (!cancelled) {
          setProducts(Array.isArray(data?.data) ? data.data : []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error loading new arrivals:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchNewArrivals();

    return () => {
      cancelled = true;
    };
  }, [homeLimit]);

  return (
    <section className="featured-section">
      <div className="page-shell">
        <div className="featured__header">
          <h2 className="featured__title">Novedades</h2>
          <Link href="/productos?q=novedades" className="featured__view-all">
            Ver todas
          </Link>
        </div>
        {loading ? (
          <div className="featured__grid">
            {[...Array(homeLimit)].map((_, i) => (
              <div key={i} className="product-card">
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 0 }} />
                <div style={{ padding: "0.85rem" }}>
                  <Skeleton variant="text" height={24} />
                  <Skeleton variant="text" width="60%" height={20} />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="featured__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--text-secondary)", padding: "2rem 0", textAlign: "center" }}>
            No hay novedades disponibles
          </p>
        )}
      </div>
    </section>
  );
}
