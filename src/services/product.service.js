import { fetchService } from "../lib/fetcher";

const normalizeCatalogResponse = (response) => {
  const meta = response?.meta || {};
  return {
    data: Array.isArray(response?.data) ? response.data : [],
    page: meta.page || 1,
    pages: meta.totalPages || 1,
    count: meta.total || 0,
    take: meta.limit || 12,
  };
};

const buildPaginationQuery = (query, params) => {
  if (params.take) query.set("limit", params.take);
  if (params.offset != null) query.set("page", Number(params.offset) + 1);
};

const buildQueryString = (query) => {
  const qs = query.toString();
  return qs ? "?" + qs : "";
};

export const productService = {
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    buildPaginationQuery(query, params);
    if (params.name) query.set("search", params.name);
    if (params.categoryId) query.set("categoryId", params.categoryId);
    const response = await fetchService.get("/catalog/products" + buildQueryString(query));
    return normalizeCatalogResponse(response);
  },

  getProductBySlug(slug) {
    return fetchService.get("/catalog/products/" + slug);
  },

  async getRelevantProducts(params = {}) {
    return productService.getNewArrivals(params);
  },

  async getNewArrivals(params = {}) {
    const query = new URLSearchParams();
    buildPaginationQuery(query, params);
    const response = await fetchService.get("/catalog/products/new-arrivals" + buildQueryString(query));
    return normalizeCatalogResponse(response);
  },
};
