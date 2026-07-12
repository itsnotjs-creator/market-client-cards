import { fetchService } from "../lib/fetcher";

export const couriersService = {
  getCities() {
    return fetchService.get("/couriers/cities");
  },

  getRates(payload) {
    return fetchService.post("/couriers/rates", payload);
  },
};
