import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getBrandsPagination = (state: RootState): TPagination => state.adminBrands.pagination;
const getBrands = (state: RootState): TPagination => state.adminBrands.products;
const getBrand = (state: RootState) => state.adminBrands.productDetail;
const getIsLoading = (state: RootState): Boolean => state.adminBrands.isLoading;


export const brandsSelectors = {
  getBrandsPagination,
  getBrands,
  getBrand,
  getIsLoading,
};
