"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import { categoryService } from "../../services/category.service";

export default function ProductSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("categoria");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getMenuCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (activeCategoryId === categoryId) {
      params.delete("categoria");
    } else {
      params.set("categoria", categoryId);
    }
    params.delete("page");
    router.push(`/productos?${params.toString()}`);
  };

  return (
    <aside className="products-sidebar">
      <h3 className="products-sidebar__title">Categorías</h3>
      {loading ? (
        <ul className="products-sidebar__list">
          {[...Array(8)].map((_, i) => (
            <li key={i}>
              <Skeleton variant="text" height={40} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="products-sidebar__list">
          <li>
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("categoria");
                params.delete("page");
                router.push(`/productos?${params.toString()}`);
              }}
              className={`products-sidebar__item ${
                !activeCategoryId ? "products-sidebar__item--active" : ""
              }`}
            >
              Todas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.id)}
                className={`products-sidebar__item ${
                  activeCategoryId === cat.id
                    ? "products-sidebar__item--active"
                    : ""
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
