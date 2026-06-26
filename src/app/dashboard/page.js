"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, SESSION_STATUS } from "../../store/authStore";

export default function DashboardPage() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    if (status === SESSION_STATUS.ANONYMOUS) {
      router.push("/login");
    }
  }, [status, router]);

  if (status === SESSION_STATUS.CHECKING || status === SESSION_STATUS.IDLE) {
    return (
      <main style={{ padding: "3rem 0", flex: 1 }}>
        <div className="page-shell">
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p>Cargando...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "3rem 0", flex: 1 }}>
      <div className="page-shell">
        <div className="page-header">
          <h1 className="page-header__title">Panel de Control</h1>
          <p className="page-header__subtitle">
            Bienvenido, {session?.user?.name || session?.user?.email || "Cliente"}
          </p>
        </div>

        <div className="form-card">
          <p>Contenido protegido - solo visible para usuarios autenticados</p>
        </div>
      </div>
    </main>
  );
}
