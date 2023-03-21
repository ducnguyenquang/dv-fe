import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getPagesPagination = (state: RootState): TPagination => state.adminPages.pagination;
const getPages = (state: RootState): TPagination => state.adminPages.products;
const getPage = (state: RootState) => state.adminPages.productDetail;
const getIsLoading = (state: RootState): Boolean => state.adminPages.isLoading;


export const pagesSelectors = {
  getPagesPagination,
  getPages,
  getPage,
  getIsLoading,
};
