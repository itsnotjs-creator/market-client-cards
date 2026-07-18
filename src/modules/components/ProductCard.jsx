import Link from "next/link";
import { API_BASE_URL } from "../../lib/fetcher";

function getProductImage(files = []) {
  const mainFile = files.find((f) => f.isMain) || files[0];
  const url = mainFile?.file?.url || mainFile?.url;
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
}

function getLowestPrice(skus = []) {
  if (!Array.isArray(skus) || skus.length === 0) return null;

  const validSkus = skus
    .filter((sku) => sku.price != null)
    .map((sku) => ({
      price: Number(sku.price),
      compareAt:
        sku.compareAtPrice != null ? Number(sku.compareAtPrice) : null,
    }))
    .filter((sku) => Number.isFinite(sku.price));

  if (validSkus.length === 0) return null;

  const lowest = validSkus.reduce((min, sku) =>
    sku.price < min.price ? sku : min,
  );

  const hasOffer = lowest.compareAt != null && lowest.compareAt > lowest.price;

  return {
    current: lowest.price,
    comparison: hasOffer ? lowest.compareAt : null,
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

function getDiscountPercentage(price) {
  if (!price || price.current == null || price.comparison == null) return null;
  if (price.current >= price.comparison) return null;

  return Math.round((1 - price.current / price.comparison) * 100);
}

export default function ProductCard({ product }) {
  const imageUrl = getProductImage(product.files);
  const price = getLowestPrice(product.skus);
  const discount = getDiscountPercentage(price);

  return (
    <Link href={`/productos/${product.slug}`} className="product-card">
      <div className="product-card__img-wrapper">
        {discount != null && (
          <span className="product-card__badge">−{discount}%</span>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="product-card__img"
          />
        ) : (
          <div className="product-card__img-placeholder" />
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        {price && (
          <div className="product-card__prices">
            {price.current != null && (
              <span className="product-card__price-current">
                {formatPrice(price.current)}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
