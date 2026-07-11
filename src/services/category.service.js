import { fetchService } from "../lib/fetcher";

export const categoryService = {
  getMenuCategories(params = {}) {
    const query = new URLSearchParams();
    if (params.take) query.set("take", params.take);
    if (params.offset != null) query.set("offset", params.offset);
    const qs = query.toString();
    return fetchService.get(`/client/categories/menu${qs ? `?${qs}` : ""}`);
  },
};