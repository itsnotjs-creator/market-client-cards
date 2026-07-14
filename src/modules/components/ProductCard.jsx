import Link from "next/link";
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

  const lowest = validSkus.reduce((min, sku) =>
    sku.price < min.price ? sku : min,
  );

  const comparisons = validSkus
    .map((sku) => sku.comparePrice)
    .filter((p) => p != null);
  const highestComparison =
    comparisons.length > 0 ? Math.max(...comparisons) : null;

  return {
    current: lowest.price,
    comparison: highestComparison,
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

export default function ProductCard({ product }) {
  const imageUrl = getProductImage(product.files);
  const price = getLowestPrice(product.skus);

  return (
    <Link href={`/productos/${product.slug}`} className="product-card">
      <div className="product-card__img-wrapper">
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
            {price.comparison && (
              <span className="product-card__price-comparison">
                {formatPrice(price.comparison)}
              </span>
            )}
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
