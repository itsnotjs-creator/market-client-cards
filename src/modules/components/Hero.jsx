"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SupportIcon from "@mui/icons-material/Support";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryCards from "./CategoryCards";
import NovedadesSection from "./NovedadesSection";
import ProductCard from "./ProductCard";
import { productService } from "../../services/product.service";
import { useConfigStore } from "../../store/configStore";

export default function Hero() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const homeLimit =
    useConfigStore((state) => state.settings.homeProductItemsLimit) || 8;

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await productService.getRelevantProducts({
          offset: 0,
          take: homeLimit,
        });
        setFeaturedProducts(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchFeatured();
  }, [homeLimit]);

  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section className="hero">
        <div className="hero__pattern">
          <span className="hero__pattern-text">VIP</span>
        </div>
        <div className="page-shell">
          <div className="hero__content">
            <span className="hero__tagline">Fragancias que dejan huella</span>
            <h1 className="hero__title">
              Perfumes 100% originales
              <br />
              <span>para tu esencia</span>
            </h1>
            <p className="hero__subtitle">
              Descubre las mejores marcas de perfumería a los mejores precios.
              Envíos a todo Chile en 24/48 horas.
            </p>
            <Link href="/productos" className="hero__cta">
              Comprar ahora
            </Link>
            <div className="hero__features">
              <div className="hero__feature">
                <SecurityIcon />
                <div>
                  <strong>Productos originales</strong>
                  <span>Garantía de autenticidad</span>
                </div>
              </div>
              <div className="hero__feature">
                <LocalShippingIcon />
                <div>
                  <strong>Envíos rápidos</strong>
                  <span>24/48 hrs a todo Chile</span>
                </div>
              </div>
              <div className="hero__feature">
                <CreditCardIcon />
                <div>
                  <strong>Pago seguro</strong>
                  <span>Múltiples medios de pago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Categories Section ===== */}
      <section className="categories-section">
        <div className="page-shell">
          <h2 className="section-title">Explora por categorías</h2>
          <p className="section-subtitle">
            Encuentra el perfume perfecto para cada ocasión
          </p>
          <CategoryCards />
        </div>
      </section>

      {/* ===== Novedades Section ===== */}
      <NovedadesSection />

      {/* ===== Featured Products Section ===== */}
      <section className="featured-section">
        <div className="page-shell">
          <div className="featured__header">
            <h2 className="featured__title">Productos destacados</h2>
            <Link href="/productos" className="featured__view-all">
              Ver todos
            </Link>
          </div>
          {loadingProducts ? (
            <div className="featured__grid">
              {[...Array(homeLimit)].map((_, i) => (
                <div key={i} className="product-card">
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: 0 }}
                  />
                  <div style={{ padding: "0.85rem" }}>
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="featured__grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p
              style={{
                color: "var(--text-secondary)",
                padding: "2rem 0",
                textAlign: "center",
              }}
            >
              No hay productos destacados disponibles
            </p>
          )}
        </div>
      </section>

      {/* ===== Bottom Features Bar ===== */}
      <section className="features-bar">
        <div className="page-shell features-bar__grid">
          <div className="features-bar__item">
            <CreditCardIcon />
            <div>
              <strong>Hasta 3 cuotas sin interés</strong>
              <span>Con tarjetas seleccionadas</span>
            </div>
          </div>
          <div className="features-bar__item">
            <LocalShippingIcon />
            <div>
              <strong>Envíos a todo Chile</strong>
              <span>Rápidos y seguros</span>
            </div>
          </div>
          <div className="features-bar__item">
            <CheckCircleIcon />
            <div>
              <strong>Productos 100% originales</strong>
              <span>Garantía de autenticidad</span>
            </div>
          </div>
          <div className="features-bar__item">
            <SupportIcon />
            <div>
              <strong>Atención personalizada</strong>
              <span>Te ayudamos a elegir</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
