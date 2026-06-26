"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, SESSION_STATUS } from "../../store/authStore";
import CatalogoSidebar from "../../modules/components/CatalogoSidebar";
import CategoryCards from "../../modules/components/CategoryCards";

export default function CatalogoPage() {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (status === SESSION_STATUS.ANONYMOUS) {
      router.push("/login");
    }
  }, [status, router]);

  if (status === SESSION_STATUS.CHECKING || status === SESSION_STATUS.IDLE) {
    return (
      <main className="catalogo-main">
        <div className="page-shell">
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p>Cargando...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="catalogo-main">
      <div className="catalogo-container">
        <CatalogoSidebar />
        <div className="catalogo-content">
          <h1 className="catalogo-title">Catálogo de Productos</h1>
          <p className="catalogo-subtitle">
            Bienvenido, {session?.user?.name || "Cliente"}
          </p>
          <CategoryCards />
        </div>
      </div>
    </main>
  );
}
