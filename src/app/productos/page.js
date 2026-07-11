"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import { productService } from "../../services/product.service";
import { useConfigStore } from "../../store/configStore";
import RelevantBanner from "../../modules/components/RelevantBanner";
import ProductSidebar from "../../modules/components/ProductSidebar";
import ProductCard from "../../modules/components/ProductCard";
import "./productos.css";

const basePaginate = {
  page: 1,
  pages: 1,
  count: 0,
  take: 10,
};
function ProductosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({ ...basePaginate });

  const take = useConfigStore((state) => state.settings.productListItemsLimit) || 12;

  const categoryId = searchParams.get("categoria");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("q") || "";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        offset: currentPage - 1,
        take,
      };
      if (categoryId) params.categoryId = categoryId;
      if (searchQuery) params.name = searchQuery;

      const data = await productService.getProducts(params);
      setProducts(Array.isArray(data?.data) ? data.data : []);
      setPagination({
        page: data?.page || 1,
        pages: data?.pages || 1,
        count: data?.count || 0,
        take: data?.take || basePaginate.take,
      });
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, categoryId, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchValue.trim()) {
      params.set("q", searchValue.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    router.push(`/productos?${params.toString()}`);
  };

  const handleSearchClear = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    params.delete("page");
    router.push(`/productos?${params.toString()}`);
  };

  const handlePageChange = (event, newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`/productos?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-shell products-page__body">
      <div className="products-page__layout">
        <ProductSidebar />

        <div className="products-page__content">
          <form onSubmit={handleSearchSubmit} className="products-search">
            <div className="products-search__input-wrapper">
              <SearchIcon className="products-search__icon" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar productos por nombre..."
                className="products-search__input"
              />
            </div>
            <button type="submit" className="products-search__btn">
              Buscar
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="products-search__btn products-search__btn--secondary"
              >
                Limpiar
              </button>
            )}
          </form>

          {searchQuery && (
            <p className="products-page__results-info">
              Resultados para: <strong>&quot;{searchQuery}&quot;</strong>
              {pagination.count > 0 && (
                <span> ({pagination.count} productos)</span>
              )}
            </p>
          )}

          {loading ? (
            <div className="products-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="product-card">
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: 0 }}
                  />
                  <div style={{ padding: "1rem" }}>
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="products-page__empty">
              <p>No se encontraron productos.</p>
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="products-search__btn"
                >
                  Ver todos los productos
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="products-page__pagination">
                  <Pagination
                    count={pagination.pages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductosPage() {
  return (
    <main className="products-page">
      <RelevantBanner />
      <Suspense
        fallback={
          <div className="page-shell products-page__body">
            <div className="products-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="product-card">
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: 0 }}
                  />
                  <div style={{ padding: "1rem" }}>
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <ProductosContent />
      </Suspense>
    </main>
  );
}
