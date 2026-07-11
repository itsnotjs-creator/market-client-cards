"use client";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCartStore } from "../../store/cartStore";

export default function CartIcon({ onClick }) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <IconButton
      onClick={onClick}
      aria-label="Carrito de compras"
      size="large"
      color="inherit"
    >
      <Badge badgeContent={totalItems} color="error" invisible={totalItems === 0}>
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
}
