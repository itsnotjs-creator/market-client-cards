"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import { categoryService } from "../../services/category.service";
import { useConfigStore } from "../../store/configStore";
import { API_BASE_URL } from "../../lib/fetcher";

const categoryIcons = {
  default: "🛍️",
  hombre: "👔",
  mujer: "👗",
  arabe: "",
  nicho: "⭐",
  ofertas: "🏷️",
  novedades: "✨",
};

function getCategoryIcon(name) {
  const lower = name.toLowerCase();
  if (lower.includes("hombre")) return categoryIcons.hombre;
  if (lower.includes("mujer")) return categoryIcons.mujer;
  if (lower.includes("arabe") || lower.includes("oriental")) return categoryIcons.arabe;
  if (lower.includes("nicho") || lower.includes("exclusivo")) return categoryIcons.nicho;
  if (lower.includes("oferta")) return categoryIcons.ofertas;
  if (lower.includes("novedad")) return categoryIcons.novedades;
  return categoryIcons.default;
}

function getImageUrl(imageFile) {
  if (!imageFile?.url) return null;
  if (imageFile.url.startsWith("http")) return imageFile.url;
  return `${API_BASE_URL}${imageFile.url}`;
}

export default function CategoryCards() {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = useConfigStore((state) => state.settings.featuredCategoriesLimit) || 6;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await categoryService.getMenuCategories({ take: limit });
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
    router.push(`/productos?categoria=${categoriaId}`);
  };

  if (loading) {
    return (
      <div className="category-cards">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={120}
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
        const icon = getCategoryIcon(cat.name);

        return (
          <button
            key={cat.id}
            onClick={() => handleCategoriaClick(cat.id)}
            className="category-card"
            style={
              imageUrl
                ? {
                    backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.35), rgba(11, 11, 11, 0.35)), url('${imageUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "140px",
                    justifyContent: "flex-end",
                  }
                : {}
            }
          >
            {imageUrl ? (
              <span className="category-card__name category-card__name--on-image">
                {cat.name}
              </span>
            ) : (
              <>
                <span className="category-card__icon">{icon}</span>
                <span className="category-card__name">{cat.name}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
