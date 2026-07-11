import { fetchService } from "../lib/fetcher";

export const configService = {
  getClientConfig() {
    return fetchService.get("/client-config");
  },
};