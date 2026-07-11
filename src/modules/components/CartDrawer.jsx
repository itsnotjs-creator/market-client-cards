"use client";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { API_BASE_URL } from "../../lib/fetcher";

function formatPrice(value) {
  if (value == null) return null;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function CartDrawer({ open, onClose }) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          padding: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Carrito de Compras
          </Typography>
          <IconButton onClick={onClose} aria-label="Cerrar carrito">
            <CloseIcon />
          </IconButton>
        </Box>

        {items.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Tu carrito está vacío
            </Typography>
            <Button
              component={Link}
              href="/productos"
              variant="contained"
              onClick={onClose}
            >
              Ver productos
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, overflow: "auto" }}>
              {items.map((item) => {
                const imageUrl = item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `${API_BASE_URL}${item.image}`
                  : null;

                return (
                  <Box
                    key={item.productId}
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2,
                      p: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                    }}
                  >
                    {imageUrl && (
                      <Box
                        component="img"
                        src={imageUrl}
                        alt={item.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        {formatPrice(item.price)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          aria-label="Reducir cantidad"
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ minWidth: 24, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          aria-label="Aumentar cantidad"
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => removeItem(item.productId)}
                          aria-label="Eliminar producto"
                          sx={{ ml: "auto" }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                pt: 2,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {formatPrice(totalPrice)}
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/checkout"
                variant="contained"
                fullWidth
                size="large"
                onClick={onClose}
              >
                Ir al checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
