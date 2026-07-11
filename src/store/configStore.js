"use client";

import { create } from "zustand";

const DEFAULT_SETTINGS = {
  maintenanceMode: false,
  bannerItemsLimit: 5,
  lowStockThreshold: 2,
  enableGuestCheckout: true,
  enableProductReviews: true,
  relatedProductsLimit: 4,
  homeProductItemsLimit: 8,
  productListItemsLimit: 12,
  featuredCategoriesLimit: 6,
};

const CONFIG_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error",
};

export const useConfigStore = create((set, get) => ({
  settings: { ...DEFAULT_SETTINGS },
  status: CONFIG_STATUS.IDLE,
  error: null,

  loadConfig: async () => {
    if (get().status === CONFIG_STATUS.LOADING) return;

    set({ status: CONFIG_STATUS.LOADING, error: null });

    try {
      const { configService } = await import("../services/config.service");
      const data = await configService.getClientConfig();
      const settings = data?.settings || {};
      set({
        settings: { ...DEFAULT_SETTINGS, ...settings },
        status: CONFIG_STATUS.LOADED,
        error: null,
      });
    } catch (error) {
      set({
        status: CONFIG_STATUS.ERROR,
        error: error?.message || "No se pudo cargar la configuración",
      });
    }
  },

  getConfig: (key) => {
    return get().settings[key];
  },
}));

export { CONFIG_STATUS };