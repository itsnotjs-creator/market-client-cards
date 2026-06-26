"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore, SESSION_STATUS } from "../../store/authStore";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/empresa", label: "Empresa" },
  { href: "/productos", label: "Productos" },
  { href: "/marcas", label: "Marcas" },
  { href: "/fuerza-de-venta", label: "Fuerza de Venta" },
  { href: "/hazte-cliente", label: "Hazte Cliente" },
  { href: "/novedades", label: "Novedades" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const session = useAuthStore((state) => state.session);
  const status = useAuthStore((state) => state.status);
  const logout = useAuthStore((state) => state.logout);

  const isAuthenticated =
    status === SESSION_STATUS.AUTHENTICATED && Boolean(session?.user);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <>
      <div className="top-bar">
        <div className="page-shell top-bar__inner">
          <span className="top-bar__tagline">
            Distribuyendo soluciones desde 1981
          </span>
          <div className="top-bar__links">
            <a href="/contacto" className="top-bar__link">
              <EmailOutlinedIcon fontSize="small" />
              Contacto
            </a>
            <a href="/soporte" className="top-bar__link">
              <SupportAgentOutlinedIcon fontSize="small" />
              Soporte
            </a>
            <a href="tel:+56225495300" className="top-bar__link">
              <PhoneOutlinedIcon fontSize="small" />
              +56 2 2549 5300
            </a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="page-shell site-header__inner">
          <Link href="/" className="site-header__logo">
            <div className="site-header__logo-text">
              CUATRO RUEDAS
              <span>Importadora</span>
            </div>
          </Link>

          <div className="site-header__search">
            <input
              type="text"
              placeholder="Buscar por código, producto, marca, vehículo..."
            />
            <select>
              <option>Todas las categorías</option>
            </select>
            <button aria-label="Buscar">
              <SearchIcon fontSize="small" />
            </button>
          </div>

          <div className="site-header__actions">
            {isAuthenticated ? (
              <>
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
                    <span className="site-header__btn-label">
                      Cerrar Sesión
                    </span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="site-header__btn site-header__btn--primary"
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                  <div>
                    <span className="site-header__btn-label">
                      Acceso Clientes
                    </span>
                    <strong>Iniciar sesión</strong>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <nav className="site-nav" aria-label="Navegación principal">
        <div className="page-shell site-nav__inner">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="site-nav__link"
                data-active={isActive}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
