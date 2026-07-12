"use client";

import Link from "next/link";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCartStore } from "../../store/cartStore";

export default function CartIcon() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Link
      href="/carrito"
      className="site-header__action-btn"
      aria-label="Carrito de compras"
    >
      <Badge
        badgeContent={totalItems}
        color="error"
        invisible={totalItems === 0}
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "0.65rem",
            height: 16,
            minWidth: 16,
          },
        }}
      >
        <ShoppingCartOutlinedIcon />
      </Badge>
      <span>Carrito</span>
    </Link>
  );
}