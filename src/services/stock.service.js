import { fetchService } from "../lib/fetcher";

export const stockService = {
  checkAvailability(productSkuIds) {
    return fetchService.post("/stock/availability", { productSkuIds });
  },
};