"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.productId === product.productId
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          set({ items: updated });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.productId === productId
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex] = { ...updated[existingIndex], quantity };
          set({ items: updated });
        }
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
      name: "cuatro-ruedas-cart",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
