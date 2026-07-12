"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

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