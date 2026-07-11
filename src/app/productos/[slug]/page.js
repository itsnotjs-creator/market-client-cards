"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { productService } from "../../../services/product.service";
import { useCartStore } from "../../../store/cartStore";
import { API_BASE_URL } from "../../../lib/fetcher";
import TiptapContent from "../../../modules/components/TiptapContent";
import "./product-detail.css";

function getProductImages(files = []) {
  const images = files
    .filter((f) => f.file?.url)
    .map((f) => ({
      url: f.file.url.startsWith("http")
        ? f.file.url
        : `${API_BASE_URL}${f.file.url}`,
      isMain: f.isMain,
      alt: f.altText || "",
      isVideo: f.file?.mimeType?.startsWith("video") || false,
    }));

  if (images.length === 0) return [];
  if (!images.find((img) => img.isMain)) images[0].isMain = true;
  return images;
}

function getLowestPrice(skus = []) {
  if (!Array.isArray(skus) || skus.length === 0) return null;
  const validSkus = skus.filter((sku) => sku.price != null);
  if (validSkus.length === 0) return null;
  const lowest = validSkus.reduce((min, sku) =>
    sku.price < min.price ? sku : min
  );
  const comparisons = validSkus
    .map((sku) => sku.comparePrice)
    .filter((p) => p != null);
  return {
    current: lowest.price,
    comparison: comparisons.length > 0 ? Math.max(...comparisons) : null,
  };
}

function formatPrice(value) {
  if (value == null) return null;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSku, setSelectedSku] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [showSkuSelect, setShowSkuSelect] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductBySlug(slug);
        setProduct(data);
        if (data?.skus?.length > 0) {
          setSelectedSku(data.skus[0]);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const images = getProductImages(product?.files || []);
  const price = getLowestPrice(product?.skus || []);

  const handleAddToCart = () => {
    if (!product || !selectedSku) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: selectedSku.price || price?.current || 0,
      quantity,
      image: images[0]?.url || null,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else if (e.key === "ArrowRight") {
      setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  }, [images.length]);

  if (loading) {
    return (
      <main className="product-detail-page">
        <div className="page-shell">
          <Skeleton variant="text" height={20} width={280} sx={{ mb: 2 }} />
          <div className="product-detail__main">
            <div className="product-detail__gallery">
              <Skeleton variant="rectangular" height={480} sx={{ borderRadius: 2 }} />
              <div className="product-detail__thumbnails">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
                ))}
              </div>
            </div>
            <div className="product-detail__info">
              <Skeleton variant="text" height={16} width={80} />
              <Skeleton variant="text" height={40} width="90%" />
              <Skeleton variant="text" height={16} width={120} />
              <Skeleton variant="text" height={48} width={200} sx={{ mt: 1 }} />
              <Skeleton variant="text" height={80} width="100%" />
              <Skeleton variant="rectangular" height={48} sx={{ mt: 2, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={48} sx={{ mt: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={48} sx={{ mt: 1, borderRadius: 1 }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-detail-page">
        <div className="page-shell">
          <p className="product-detail__not-found">Producto no encontrado</p>
        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <div className="page-shell">
        {/* ===== Breadcrumbs ===== */}
        <nav className="product-detail__breadcrumbs" aria-label="Navegación">
          <Link href="/" className="product-detail__breadcrumb-link">Inicio</Link>
          <span className="product-detail__breadcrumb-separator">›</span>
          <Link href="/productos" className="product-detail__breadcrumb-link">Perfumes</Link>
          {product.categories?.[0]?.category && (
            <>
              <span className="product-detail__breadcrumb-separator">›</span>
              <Link
                href={`/productos?categoria=${product.categories[0].categoryId}`}
                className="product-detail__breadcrumb-link"
              >
                {product.categories[0].category.name}
              </Link>
            </>
          )}
          <span className="product-detail__breadcrumb-separator">›</span>
          <span className="product-detail__breadcrumb-current">{product.name}</span>
        </nav>

        {/* ===== Main Content ===== */}
        <div className="product-detail__main">
          {/* ===== Gallery ===== */}
          <div className="product-detail__gallery" ref={galleryRef} onKeyDown={handleKeyDown} tabIndex={0}>
            <div className="product-detail__main-image">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]?.url || images[0].url}
                  alt={images[selectedImage]?.alt || product.name}
                  className="product-detail__image"
                />
              ) : (
                <div className="product-detail__image-placeholder">
                  Sin imagen
                </div>
              )}

              {/* Top ventas badge */}
              <span className="product-detail__badge">Top ventas</span>

              {/* Favorite button */}
              <button
                className="product-detail__favorite"
                aria-label="Añadir a favoritos"
              >
                <FavoriteBorderIcon />
              </button>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    className="product-detail__gallery-nav product-detail__gallery-nav--prev"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev > 0 ? prev - 1 : images.length - 1
                      )
                    }
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    className="product-detail__gallery-nav product-detail__gallery-nav--next"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev < images.length - 1 ? prev + 1 : 0
                      )
                    }
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRightIcon />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="product-detail__thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`product-detail__thumbnail ${
                      idx === selectedImage ? "product-detail__thumbnail--active" : ""
                    }`}
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    aria-selected={idx === selectedImage}
                  >
                    {img.isVideo ? (
                      <div className="product-detail__thumbnail-video">
                        <PlayCircleIcon />
                        <img src={img.url} alt={img.alt || product.name} />
                      </div>
                    ) : (
                      <img src={img.url} alt={img.alt || product.name} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== Product Info ===== */}
          <div className="product-detail__info">
            {/* Brand */}
            {product.categories?.[0]?.category && (
              <span className="product-detail__brand">
                {product.categories[0].category.name.toUpperCase()}
              </span>
            )}

            {/* Name */}
            <h1 className="product-detail__name">{product.name}</h1>

            {/* Subtitle */}
            {product.unit && (
              <p className="product-detail__subtitle">
                {product.unit.name} ({product.unit.abbreviation})
              </p>
            )}

            {/* Rating */}
            <div className="product-detail__rating">
              <Rating value={4.8} precision={0.5} readOnly size="small" />
              <span className="product-detail__rating-text">
                4.8 (256 opiniones) | 1.2K vendidos
              </span>
            </div>

            {/* Price */}
            <div className="product-detail__price-section">
              {price?.comparison && (
                <span className="product-detail__price-comparison">
                  {formatPrice(price.comparison)}
                </span>
              )}
              <span className="product-detail__price-current">
                {formatPrice(price?.current)}
              </span>
            </div>

            {/* Shipping indicator */}
            <div className="product-detail__shipping">
              <LocalShippingIcon fontSize="small" />
              <span>Envíos a todo Chile en 24/48 hrs</span>
            </div>

            {/* Description */}
            <div className="product-detail__description">
              <TiptapContent content={product.description || ""} />
            </div>

            <Divider className="product-detail__divider" />

            {/* ===== SKU Selector (AliExpress-style) ===== */}
            {product.skus && product.skus.length > 0 && (
              <div className="product-detail__sku-section">
                <div className="product-detail__section-header">
                  <span className="product-detail__section-number">1.</span>
                  <h3 className="product-detail__section-title">
                    Elige la versión (SKU)
                  </h3>
                  <a href="#" className="product-detail__section-link" onClick={(e) => e.preventDefault()}>
                    ¿Cuál es la diferencia entre versiones?
                  </a>
                </div>

                {/* Card buttons */}
                <div className="product-detail__sku-cards">
                  {product.skus.map((sku) => {
                    const isSelected = selectedSku?.id === sku.id;
                    const outOfStock = sku.stock != null && sku.stock <= 0;

                    return (
                      <button
                        key={sku.id}
                        className={`product-detail__sku-card ${
                          isSelected ? "product-detail__sku-card--active" : ""
                        } ${outOfStock ? "product-detail__sku-card--disabled" : ""}`}
                        onClick={() => !outOfStock && setSelectedSku(sku)}
                        disabled={outOfStock}
                        aria-pressed={isSelected}
                        aria-label={sku.name || sku.id}
                      >
                        <span className="product-detail__sku-card-name">
                          {sku.name || `Versión ${sku.id.slice(0, 8)}`}
                        </span>
                        {sku.price != null && (
                          <span className="product-detail__sku-card-price">
                            {formatPrice(sku.price)}
                          </span>
                        )}
                        {outOfStock && (
                          <span className="product-detail__sku-card-stock">
                            Sin stock
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Selected SKU preview */}
                {selectedSku && (
                  <div className="product-detail__sku-preview">
                    <span className="product-detail__sku-preview-label">
                      Versión seleccionada:
                    </span>
                    <strong className="product-detail__sku-preview-value">
                      {selectedSku.name || `Versión ${selectedSku.id.slice(0, 8)}`}
                    </strong>
                    {selectedSku.price != null && (
                      <span className="product-detail__sku-preview-price">
                        {formatPrice(selectedSku.price)}
                      </span>
                    )}
                    {selectedSku.stock != null && selectedSku.stock > 0 && (
                      <span className="product-detail__sku-preview-stock">
                        <CheckCircleOutlinedIcon fontSize="small" />
                        {selectedSku.stock} disponibles
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ===== Quantity ===== */}
            <div className="product-detail__quantity-section">
              <div className="product-detail__section-header">
                <span className="product-detail__section-number">2.</span>
                <h3 className="product-detail__section-title">Cantidad</h3>
              </div>
              <div className="product-detail__quantity-controls">
                <button
                  className="product-detail__quantity-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Reducir cantidad"
                >
                  <RemoveIcon fontSize="small" />
                </button>
                <span className="product-detail__quantity-value" aria-live="polite">
                  {quantity}
                </span>
                <button
                  className="product-detail__quantity-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <AddIcon fontSize="small" />
                </button>
              </div>
            </div>

            {/* ===== Actions ===== */}
            <div className="product-detail__actions">
              <button
                className="product-detail__btn product-detail__btn--add"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon fontSize="small" />
                Añadir al carrito
              </button>
              <button
                className="product-detail__btn product-detail__btn--buy"
                onClick={handleBuyNow}
              >
                Comprar ahora
              </button>
            </div>

            {/* ===== Features ===== */}
            <div className="product-detail__features">
              <div className="product-detail__feature">
                <SecurityIcon fontSize="small" />
                <span>Pago 100% seguro</span>
              </div>
              <div className="product-detail__feature">
                <CheckCircleOutlinedIcon fontSize="small" />
                <span>Productos originales</span>
              </div>
              <div className="product-detail__feature">
                <LocalShippingIcon fontSize="small" />
                <span>Devoluciones fáciles</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Tabs Section ===== */}
        <div className="product-detail__tabs-section">
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            className="product-detail__tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Descripción" />
            <Tab label="Características" />
            <Tab label="Envíos y devoluciones" />
            <Tab label="Opiniones" />
          </Tabs>

          <div className="product-detail__tab-content">
            {tabValue === 0 && (
              <TiptapContent content={product.description || "Descripción del producto próximamente disponible."} />
            )}
            {tabValue === 1 && (
              <p>Características técnicas del producto próximamente disponibles.</p>
            )}
            {tabValue === 2 && (
              <p>
                Realizamos envíos a todo Chile. Tiempo de entrega: 24-48 hrs en regiones
                metropolitanas, 3-5 días hábiles en regiones. Aceptamos devoluciones
                dentro de los primeros 30 días.
              </p>
            )}
            {tabValue === 3 && (
              <p>Próximamente: opiniones de clientes.</p>
            )}
          </div>
        </div>

        {/* ===== Related Products ===== */}
        <div className="product-detail__related">
          <h2 className="product-detail__related-title">También te puede gustar</h2>
          <p className="product-detail__related-placeholder">
            Productos relacionados próximamente
          </p>
        </div>
      </div>
    </main>
  );
}