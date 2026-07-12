import { fetchService } from "../lib/fetcher";

export const productService = {
  getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.offset != null) query.set("offset", params.offset);
    if (params.take) query.set("take", params.take);
    if (params.name) query.set("name", params.name);
    if (params.categoryId) query.set("categoryId", params.categoryId);
    const qs = query.toString();
    return fetchService.get(`/products${qs ? `?${qs}` : ""}`);
  },

  getProductBySlug(slug) {
    return fetchService.get(`/products/${slug}`);
  },

  getRelevantProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.take) query.set("take", params.take);
    if (params.offset != null) query.set("offset", params.offset);
    const qs = query.toString();
    return fetchService.get(`/products/relevant/list${qs ? `?${qs}` : ""}`);
  },

  getNewArrivals(params = {}) {
    const query = new URLSearchParams();
    if (params.take) query.set("take", params.take);
    if (params.offset != null) query.set("offset", params.offset);
    const qs = query.toString();
    return fetchService.get(`/catalog/new-arrivals${qs ? `?${qs}` : ""}`);
  },
};
