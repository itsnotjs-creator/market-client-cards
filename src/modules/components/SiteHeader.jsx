"use client";

import { useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Skeleton from "@mui/material/Skeleton";
import { useAuthStore, SESSION_STATUS } from "../../store/authStore";
import CartIcon from "./CartIcon";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Perfumes" },
  { href: "/productos?q=novedades", label: "Novedades" },
  { href: "/productos?q=ofertas", label: "Ofertas" },
  { href: "/empresa", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="site-nav" aria-label="Navegación principal">
      <div className="page-shell site-nav__inner">
        {navigation.map((item) => {
          const [itemPath, itemQuery] = item.href.split("?");
          const itemParams = new URLSearchParams(itemQuery || "");
          const itemQ = itemParams.get("q");

          let isActive;
          if (item.href === "/") {
            isActive = pathname === "/";
          } else if (itemQ) {
            isActive = pathname === itemPath && searchParams.get("q") === itemQ;
          } else {
            isActive =
              (pathname === itemPath && !searchParams.get("q")) ||
              (pathname !== itemPath && pathname.startsWith(`${itemPath}/`));
          }

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
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const status = useAuthStore((state) => state.status);
  const logout = useAuthStore((state) => state.logout);
  const [searchValue, setSearchValue] = useState("");

  const isLoading = status === SESSION_STATUS.IDLE || status === SESSION_STATUS.CHECKING;
  const isAuthenticated =
    status === SESSION_STATUS.AUTHENTICATED && Boolean(session?.user);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/productos?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  return (
    <>
      {/* ===== Top Bar ===== */}
      <div className="top-bar">
        <div className="page-shell top-bar__inner">
          <div className="top-bar__left">
            <span className="top-bar__link">
              <LocalShippingIcon fontSize="small" />
              Envíos a todo Chile
            </span>
            <span className="top-bar__link">
              <LocalShippingIcon fontSize="small" />
              Envíos en 24/48 hrs
            </span>
          </div>
          <div className="top-bar__right">
            <Link href="/contacto" className="top-bar__link">
              <EmailOutlinedIcon fontSize="small" />
              Contáctanos
            </Link>
            <Link href="/perfil" className="top-bar__link">
              <PersonOutlinedIcon fontSize="small" />
              Mi cuenta
            </Link>
            <Link href="/favoritos" className="top-bar__link">
              <FavoriteBorderIcon fontSize="small" />
              Favoritos
            </Link>
            <span className="top-bar__link top-bar__cart">
              <CartIcon />
            </span>
          </div>
        </div>
      </div>

      {/* ===== Main Header ===== */}
      <header className="site-header">
        <div className="page-shell site-header__inner">
          <Link href="/" className="site-header__logo">
            <div className="site-header__logo-text">
              PERFUMES VIP
              <span>Tienda Online</span>
            </div>
          </Link>

          <form onSubmit={handleSearchSubmit} className="site-header__search">
            <input
              type="text"
              placeholder="Buscar perfumes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" aria-label="Buscar">
              <SearchIcon fontSize="small" />
            </button>
          </form>

          <div className="site-header__actions">
            <CartIcon />

            {isLoading ? (
              <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
            ) : isAuthenticated ? (
              <>
                <Link href="/perfil" className="site-header__action-btn">
                  <PersonOutlinedIcon />
                  <span>{session?.user?.name || "Mi cuenta"}</span>
                </Link>
                <button onClick={handleLogout} className="site-header__action-btn" aria-label="Cerrar sesión">
                  <LogoutIcon />
                </button>
              </>
            ) : (
              <Link href="/login" className="site-header__action-btn site-header__action-btn--login">
                <PersonOutlinedIcon />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ===== Navigation ===== */}
      <Suspense fallback={<nav className="site-nav"><div className="page-shell site-nav__inner" /></nav>}>
        <NavLinks />
      </Suspense>
    </>
  );
}