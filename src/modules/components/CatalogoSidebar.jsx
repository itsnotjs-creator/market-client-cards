"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import { categoryService } from "../../services/category.service";

export default function CatalogoSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriaActual = searchParams.get("categoria");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await categoryService.getMenuCategories();
        setCategorias(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleCategoriaClick = (categoriaId) => {
    const params = new URLSearchParams(searchParams);
    if (categoriaActual === categoriaId) {
      params.delete("categoria");
    } else {
      params.set("categoria", categoriaId);
    }
    router.push(`/catalogo?${params.toString()}`);
  };

  return (
    <aside className="catalogo-sidebar">
      <h3 className="catalogo-sidebar__title">Categorías</h3>
      {loading ? (
        <ul className="catalogo-sidebar__list">
          {[...Array(8)].map((_, i) => (
            <li key={i}>
              <Skeleton variant="text" height={40} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="catalogo-sidebar__list">
          {categorias.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoriaClick(cat.id)}
                className={`catalogo-sidebar__item ${
                  categoriaActual === cat.id ? "catalogo-sidebar__item--active" : ""
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
