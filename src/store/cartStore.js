"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { stockService } from "../services/stock.service";
import { couriersService } from "../services/couriers.service";

const normalizeRut = (rut) => rut.replace(/[^0-9]/g, "");

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      stockCheckStatus: "idle",
      courierCities: [],
      courierCitiesStatus: "idle",
      shippingRate: null,
      shippingRateStatus: "idle",

      addItem: (product) => {
        const items = get().items;
        const cartKey = `${product.productId}-${product.skuId || "default"}`;

        const existingIndex = items.findIndex(
          (item) => `${item.productId}-${item.skuId || "default"}` === cartKey
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + (product.quantity || 1),
          };
          set({ items: updated });
        } else {
          set({
            items: [
              ...items,
              {
                productId: product.productId,
                slug: product.slug || "",
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1,
                image: product.image || null,
                skuId: product.skuId || null,
                skuName: product.skuName || null,
              },
            ],
          });
        }
      },

      removeItem: (productId, skuId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.skuId === skuId
              )
          ),
        });
      },

      updateQuantity: (productId, skuId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, skuId);
          return;
        }

        const items = get().items;
        const index = items.findIndex(
          (item) =>
            item.productId === productId &&
            item.skuId === skuId
        );

        if (index >= 0) {
          const updated = [...items];
          updated[index] = { ...updated[index], quantity };
          set({ items: updated });
        }
      },

      setQuantity: (productId, skuId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, skuId);
          return;
        }

        const items = get().items;
        const index = items.findIndex(
          (item) =>
            item.productId === productId && item.skuId === skuId
        );

        if (index >= 0) {
          const updated = [...items];
          updated[index] = { ...updated[index], quantity };
          set({ items: updated });
        }
      },

      removeItems: (itemsToRemove) => {
        const removeSet = new Set(
          itemsToRemove.map((i) => `${i.productId}-${i.skuId}`)
        );
        set({
          items: get().items.filter(
            (item) => !removeSet.has(`${item.productId}-${item.skuId}`)
          ),
        });
      },

      checkStock: async () => {
        const items = get().items;
        const skuIds = items.map((item) => item.skuId).filter(Boolean);
        set({ stockCheckStatus: "checking" });
        if (skuIds.length === 0) {
          set({ stockCheckStatus: "ready" });
          return { zeroStockItems: [], adjustedItems: [] };
        }
        try {
          const availability = await stockService.checkAvailability(skuIds);
          const zeroStockItems = [];
          const adjustedItems = [];
          for (const item of items) {
            const available = availability[item.skuId];
            if (available === 0) zeroStockItems.push(item);
            else if (available < item.quantity) adjustedItems.push({ ...item, newQuantity: available });
          }
          if (zeroStockItems.length > 0) get().removeItems(zeroStockItems);
          for (const item of adjustedItems) get().setQuantity(item.productId, item.skuId, item.newQuantity);
          set({ stockCheckStatus: "ready" });
          return { zeroStockItems, adjustedItems };
        } catch (error) {
          set({ stockCheckStatus: "error" });
          throw error;
        }
      },

      loadCourierCities: async () => {
        if (get().courierCitiesStatus === "loading") return;
        set({ courierCitiesStatus: "loading" });
        try {
          const response = await couriersService.getCities();
          set({ courierCities: response?.listaCiudadesOrigen || [], courierCitiesStatus: "ready" });
        } catch (error) {
          set({ courierCitiesStatus: "error" });
          throw error;
        }
      },

      loadShippingRate: async ({ destination, buyerRut }) => {
        if (!destination || normalizeRut(buyerRut || "").length < 8) {
          set({ shippingRate: null, shippingRateStatus: "idle" });
          return;
        }
        set({ shippingRateStatus: "loading" });
        try {
          const response = await couriersService.getRates({
            type: "STARKEN", codigoCiudadOrigen: 1, codigoCiudadDestino: destination.codigoCiudad,
            codigoAgenciaDestino: 0, codigoAgenciaOrigen: 0, cuentaCorriente: "", cuentaCorrienteDV: "",
            rutCliente: normalizeRut(buyerRut),
            productsIds: get().items.map((item) => ({ [item.productId]: item.quantity })),
          });
          set({ shippingRate: response?.listaTarifas?.[0] || null, shippingRateStatus: "ready" });
        } catch (error) {
          set({ shippingRate: null, shippingRateStatus: "error" });
          throw error;
        }
      },

      resetShippingRate: () => set({ shippingRate: null, shippingRateStatus: "idle" }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "perfumes-vip-cart",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);