import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { ProductFilters } from 'models/product';
import { initialState } from './slice';

const getProductsPagination = (state: RootState): TPagination => state.products.pagination;
const getProducts = (state: RootState): TPagination => state.products.products;
const getProduct = (state: RootState) => state.products.productDetail;
const getIsLoading = (state: RootState): Boolean => state.products.isLoading;
const getFilters = (state: RootState): ProductFilters  => state.products.filters;
const getFiltersApply = (state: RootState): ProductFilters  => state.products.filtersApply;


export const productsSelectors = {
  getProductsPagination,
  getProducts,
  getIsLoading,
  getProduct,
  getFilters,
  getFiltersApply,
};
