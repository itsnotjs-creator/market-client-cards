"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCartStore } from "../../store/cartStore";
import { showError, showSuccess, showWarning } from "../../lib/errorHandler";
import { API_BASE_URL } from "../../lib/fetcher";
import { checkoutSchema } from "../../lib/validation/checkoutValidation";
import "./carrito.css";

const regiones = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes",
];

function formatPrice(value) {
  if (value == null) return null;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(value);
}

function getItemImage(image) {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${API_BASE_URL}${image}`;
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const [paymentExpanded, setPaymentExpanded] = useState(false);
  const [shippingExpanded, setShippingExpanded] = useState(false);
  const checkStock = useCartStore((state) => state.checkStock);
  const loadCourierCities = useCartStore((state) => state.loadCourierCities);
  const loadShippingRate = useCartStore((state) => state.loadShippingRate);
  const resetShippingRate = useCartStore((state) => state.resetShippingRate);
  const stockCheckStatus = useCartStore((state) => state.stockCheckStatus);
  const courierCities = useCartStore((state) => state.courierCities);
  const courierCitiesStatus = useCartStore((state) => state.courierCitiesStatus);
  const shippingRate = useCartStore((state) => state.shippingRate);
  const shippingRateStatus = useCartStore((state) => state.shippingRateStatus);

  useEffect(() => {
    void checkStock().then(({ zeroStockItems, adjustedItems }) => {
      const name = (item) => item.skuName ? item.name + " (" + item.skuName + ")" : item.name;
      const removed = zeroStockItems.map(name).join(", ");
      const adjusted = adjustedItems.map(name).join(", ");
      if (removed && adjusted) showWarning("Sin stock: " + removed + ". Cantidad ajustada: " + adjusted + ".", "Inventario actualizado");
      else if (removed) showWarning("Sin stock, removidos del carrito: " + removed + ".", "Inventario actualizado");
      else if (adjusted) showWarning("Cantidad ajustada por stock disponible: " + adjusted + ".", "Inventario actualizado");
    }).catch(() => showError("No se pudo verificar el stock", "Intenta nuevamente."));
    void loadCourierCities().catch(() => showError("No se pudieron cargar las comunas", "Intenta nuevamente en unos minutos."));
    // Store actions own the async lifecycle; this effect only starts initialization once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      rut: "",
      email: "",
      phone: "",
      address: "",
      comuna: "",
      region: "",
      courier: "starken",
      createAccount: false,
      password: "",
    },
  });

  const selectedComuna = watch("comuna");
  const buyerRut = watch("rut");
  const createAccount = watch("createAccount");

  const courierCommunes = courierCities.flatMap((city) =>
    (city.listaComunas || []).map((comuna) => ({
      ...comuna,
      codigoCiudad: city.codigoCiudad,
      nombreCiudad: city.nombreCiudad,
    })),
  );

  useEffect(() => {
    const destination = courierCommunes.find((comuna) => String(comuna.codigoComuna) === String(selectedComuna));
    if (!destination || !buyerRut || items.length === 0) {
      resetShippingRate();
      return;
    }
    void loadShippingRate({ destination, buyerRut }).catch(() => {
      showError("No se pudo calcular el envío", "Verifica los datos e intenta nuevamente.");
    });
  }, [selectedComuna, buyerRut, courierCities, items, loadShippingRate, resetShippingRate]);

  const handlePaymentChange = (panel) => (event, isExpanded) => {
    setPaymentExpanded(isExpanded ? panel : false);
  };

  const handleShippingChange = (panel) => (event, isExpanded) => {
    setShippingExpanded(isExpanded ? panel : false);
  };

  const onSubmit = (data) => {
    // Mercado Pago integration pendiente
    console.log("Checkout data:", data);
    showSuccess(
      "Datos guardados",
      "Cuando integremos Mercado Pago, continuarás al pago aquí.",
    );
  };

  const onError = () => {
    // Expand the shipping accordion so errors are visible
    setShippingExpanded("shipping");
    showError(
      "Faltan datos",
      "Completa los datos del comprador y envío antes de continuar.",
    );
  };

  if (stockCheckStatus === "idle" || stockCheckStatus === "checking") {
    return (
      <main className="cart-page">
        <div className="page-shell">
          <div className="cart-page__checking">
            <div className="cart-page__checking-spinner" />
            <p className="cart-page__checking-text">
              Verificando stock disponible...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="page-shell">
          <div className="cart-page__empty">
            <h1 className="cart-page__empty-title">Tu carrito está vacío</h1>
            <p className="cart-page__empty-text">
              Explora nuestro catálogo y encuentra el perfume perfecto para ti.
            </p>
            <Link href="/productos" className="cart-page__empty-cta">
              Ver productos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="page-shell">
        {/* Breadcrumb */}
        <nav className="cart-page__breadcrumbs">
          <Link href="/" className="cart-page__breadcrumb-link">
            Inicio
          </Link>
          <span className="cart-page__breadcrumb-separator">›</span>
          <span className="cart-page__breadcrumb-current">Carrito</span>
        </nav>

        <h1 className="cart-page__title">Carrito de compras</h1>
        <p className="cart-page__count">
          {totalItems} {totalItems === 1 ? "producto" : "productos"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="cart-page__layout"
        >
          {/* ===== Left: Items + Accordions ===== */}
          <div className="cart-page__main">
            {/* Section 1: Product List */}
            <div className="cart-section">
              <h2 className="cart-section__title">
                1. Productos en tu carrito
              </h2>
              <div className="cart-items">
                {items.map((item) => {
                  const imageUrl = getItemImage(item.image);
                  const displayName = item.skuName
                    ? `${item.name} (${item.skuName})`
                    : item.name;

                  return (
                    <div
                      key={`${item.productId}-${item.skuId || "default"}`}
                      className="cart-item"
                    >
                      <Link
                        href={`/productos/${item.slug}`}
                        className="cart-item__image-link"
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="cart-item__image"
                          />
                        ) : (
                          <div className="cart-item__image-placeholder" />
                        )}
                      </Link>

                      <div className="cart-item__info">
                        <Link
                          href={`/productos/${item.slug}`}
                          className="cart-item__name"
                        >
                          {displayName}
                        </Link>
                        <span className="cart-item__unit-price">
                          {formatPrice(item.price)} c/u
                        </span>
                      </div>

                      <div className="cart-item__controls">
                        <div className="cart-item__quantity">
                          <button
                            type="button"
                            className="cart-item__qty-btn"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.skuId,
                                item.quantity - 1,
                              )
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Reducir cantidad"
                          >
                            <RemoveIcon fontSize="small" />
                          </button>
                          <span className="cart-item__qty-value">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="cart-item__qty-btn"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.skuId,
                                item.quantity + 1,
                              )
                            }
                            aria-label="Aumentar cantidad"
                          >
                            <AddIcon fontSize="small" />
                          </button>
                        </div>

                        <span className="cart-item__subtotal">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                          type="button"
                          className="cart-item__remove"
                          onClick={() => removeItem(item.productId, item.skuId)}
                          aria-label="Eliminar producto"
                        >
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="cart-section__clear"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            </div>

            {/* Section 2: Payment Method (collapsed by default) */}
            <Accordion
              expanded={paymentExpanded === "payment"}
              onChange={handlePaymentChange("payment")}
              className="cart-accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="cart-accordion__summary"
              >
                <Typography className="cart-accordion__title">
                  2. Método de pago
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="cart-accordion__details">
                <div className="cart-payment">
                  <div className="cart-payment__option cart-payment__option--selected">
                    <div className="cart-payment__option-info">
                      <span className="cart-payment__option-name">
                        Mercado Pago
                      </span>
                      <span className="cart-payment__option-desc">
                        Paga con Mercado Pago de forma segura
                      </span>
                    </div>
                    <span className="cart-payment__option-badge">
                      Seleccionado
                    </span>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

            {/* Section 3: Buyer Data + Shipping (collapsed by default) */}
            <Accordion
              expanded={shippingExpanded === "shipping"}
              onChange={handleShippingChange("shipping")}
              className="cart-accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="cart-accordion__summary"
              >
                <Typography className="cart-accordion__title">
                  3. Datos del comprador y envío
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="cart-accordion__details">
                <div className="cart-shipping">
                  {/* Buyer data */}
                  <h3 className="cart-shipping__subtitle">
                    Datos del comprador
                  </h3>
                  <div className="cart-shipping__grid">
                    <div className="cart-shipping__field">
                      <label htmlFor="fullName">Nombre completo</label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Tu nombre completo"
                        className={errors.fullName ? "has-error" : ""}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <span className="field-error">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>
                    <div className="cart-shipping__field">
                      <label htmlFor="rut">RUT</label>
                      <input
                        id="rut"
                        type="text"
                        placeholder="12.345.678-9"
                        className={errors.rut ? "has-error" : ""}
                        {...register("rut")}
                      />
                      {errors.rut && (
                        <span className="field-error">
                          {errors.rut.message}
                        </span>
                      )}
                    </div>
                    <div className="cart-shipping__field">
                      <label htmlFor="email">Correo electrónico</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="tucorreo@email.com"
                        className={errors.email ? "has-error" : ""}
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="field-error">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="cart-shipping__field">
                      <label htmlFor="phone">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        className={errors.phone ? "has-error" : ""}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <span className="field-error">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>

                    <div className="cart-shipping__field cart-shipping__field--full">
                      <Controller
                        name="createAccount"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.value || false}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            }
                            label="Registrarme para seguir mis compras"
                          />
                        )}
                      />
                    </div>

                    {createAccount && (
                      <div className="cart-shipping__field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
                          className={errors.password ? "has-error" : ""}
                          {...register("password")}
                        />
                        {errors.password && (
                          <span className="field-error">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Shipping address */}
                  <h3 className="cart-shipping__subtitle">
                    Dirección de envío
                  </h3>
                  <div className="cart-shipping__grid">
                    <div className="cart-shipping__field cart-shipping__field--full">
                      <label htmlFor="address">Dirección</label>
                      <input
                        id="address"
                        type="text"
                        placeholder="Calle, número, depto"
                        className={errors.address ? "has-error" : ""}
                        {...register("address")}
                      />
                      {errors.address && (
                        <span className="field-error">
                          {errors.address.message}
                        </span>
                      )}
                    </div>
                    <div className="cart-shipping__field">
                      <label htmlFor="comuna">Comuna</label>
                      <select
                        id="comuna"
                        disabled={courierCitiesStatus === "loading"}
                        className={errors.comuna ? "has-error" : ""}
                        {...register("comuna")}
                      >
                        <option value="">
                          {courierCitiesStatus === "loading"
                            ? "Cargando comunas..."
                            : "Selecciona una comuna"}
                        </option>
                        {courierCommunes.map((comuna) => (
                          <option
                            key={comuna.codigoComuna}
                            value={comuna.codigoComuna}
                          >
                            {comuna.nombreComuna} ({comuna.nombreCiudad})
                          </option>
                        ))}
                      </select>
                      {errors.comuna && (
                        <span className="field-error">
                          {errors.comuna.message}
                        </span>
                      )}
                    </div>
                    <div className="cart-shipping__field">
                      <label htmlFor="region">Región</label>
                      <select
                        id="region"
                        className={errors.region ? "has-error" : ""}
                        {...register("region")}
                      >
                        <option value="">Selecciona una región</option>
                        {regiones.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                      {errors.region && (
                        <span className="field-error">
                          {errors.region.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Courier selector */}
                  <h3 className="cart-shipping__subtitle">
                    Courier / Transporte
                  </h3>
                  <div className="cart-shipping__courier">
                    <label className="cart-shipping__courier-option cart-shipping__courier-option--selected">
                      <input
                        type="radio"
                        value="starken"
                        className="cart-shipping__courier-radio"
                        {...register("courier")}
                      />
                      <div className="cart-shipping__courier-content">
                        <span className="cart-shipping__courier-name">
                          Starken
                        </span>
                        <span className="cart-shipping__courier-desc">
                          Envío por Starken a todo el país
                        </span>
                      </div>
                      <span className="cart-shipping__courier-badge">
                        Seleccionado
                      </span>
                    </label>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* ===== Right: Summary ===== */}
          <aside className="cart-page__summary">
            <h2 className="cart-summary__title">Resumen de compra</h2>
            <div className="cart-summary__row">
              <span>Productos ({totalItems})</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Envío (cobro a destino)</span>
              <span className="cart-summary__shipping">
                {shippingRateStatus === "loading"
                  ? "Calculando..."
                  : shippingRate?.costoTotal
                    ? "Aprox. " + formatPrice(shippingRate.costoTotal)
                    : "Cobro a destino"}
              </span>
            </div>
            <p className="cart-summary__shipping-note">
              El valor mostrado es aproximado. Starken cobrará el envío al
              recibirlo.
            </p>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span className="cart-summary__total">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button type="submit" className="cart-summary__checkout-btn">
              Continuar al pago
            </button>
            <Link href="/productos" className="cart-summary__continue">
              <ChevronLeftIcon fontSize="small" />
              Seguir comprando
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
