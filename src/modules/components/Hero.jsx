"use client";

import Link from "next/link";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SupportIcon from "@mui/icons-material/Support";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryCards from "./CategoryCards";

export default function Hero() {
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
              Perfumes 100% originales<br />
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
          <p className="section-subtitle">Encuentra el perfume perfecto para cada ocasión</p>
          <CategoryCards />
        </div>
      </section>

      {/* ===== Featured Products Section ===== */}
      <section className="featured-section">
        <div className="page-shell">
          <div className="featured__header">
            <h2 className="featured__title">Productos destacados</h2>
            <Link href="/productos" className="featured__view-all">
              Ver todos
            </Link>
          </div>
          <div className="featured__grid">
            {/* Products will be loaded dynamically in future */}
            <p style={{ color: "var(--text-secondary)", padding: "2rem 0", textAlign: "center", gridColumn: "1 / -1" }}>
              Próximamente: productos destacados del catálogo
            </p>
          </div>
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