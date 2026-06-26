import { fetchService } from '../lib/fetch.service';

export const categoryService = {
  getMenuCategories() {
    return fetchService.get('/client/categories/menu');
  },
};
