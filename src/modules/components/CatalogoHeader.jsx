"use client";

import Link from "next/link";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore, SESSION_STATUS } from "../../store/authStore";

export default function CatalogoHeader() {
  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <header className="catalogo-header">
      <div className="page-shell catalogo-header__inner">
        <Link href="/catalogo" className="site-header__logo">
          <div className="site-header__logo-text">
            CUATRO RUEDAS
            <span>Importadora</span>
          </div>
        </Link>

        <div className="catalogo-header__actions">
          <Link
            href="/perfil"
            className="site-header__btn site-header__btn--outline"
          >
            <PersonOutlinedIcon fontSize="small" />
            <div>
              <span className="site-header__btn-label">Mi Cuenta</span>
              <strong>{session?.user?.name || "Perfil"}</strong>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="site-header__btn site-header__btn--outline"
          >
            <LogoutIcon fontSize="small" />
            <div>
              <span className="site-header__btn-label">Cerrar Sesión</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
