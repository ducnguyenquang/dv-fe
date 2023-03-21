import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getPagesPagination = (state: RootState): TPagination => state.pages.pagination;
const getPages = (state: RootState): TPagination => state.pages.products;
const getPage = (state: RootState) => state.pages.productDetail;
const getIsLoading = (state: RootState): Boolean => state.pages.isLoading;


export const pagesSelectors = {
  getPagesPagination,
  getPages,
  getPage,
  getIsLoading,
};
