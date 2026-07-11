import { fetchService } from "../lib/fetcher";

export const categoryService = {
  getMenuCategories() {
    return fetchService.get("/client/categories/menu");
  },
};
