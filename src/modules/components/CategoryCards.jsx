"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import { categoryService } from "../../services/category.service";
import { API_BASE_URL } from "../../lib/fetcher";

export default function CategoryCards() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    params.set("categoria", categoriaId);
    router.push(`/productos?categoria=${categoriaId}`);
  };

  const getImageUrl = (imageFile) => {
    if (!imageFile?.url) return null;
    if (imageFile.url.startsWith("http")) return imageFile.url;
    return `${API_BASE_URL}${imageFile.url}`;
  };

  if (loading) {
    return (
      <div className="category-cards">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={180}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="category-cards">
      {categorias.map((cat) => {
        const imageUrl = getImageUrl(cat.imageFile);
        const style = imageUrl
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imageUrl}')`,
            }
          : {};
        return (
          <button
            key={cat.id}
            onClick={() => handleCategoriaClick(cat.id)}
            className="category-card"
            style={style}
          >
            <span className="category-card__name">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
