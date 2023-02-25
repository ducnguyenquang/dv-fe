import type { RootState } from 'config/configureStore';
import { TPagination } from 'models/pagination';

const getTopMenusPagination = (state: RootState): TPagination => state.adminTopMenus.topMenuPagination;
const getTopMenus = (state: RootState): TPagination => state.adminTopMenus.topMenus;
const getTopMenu = (state: RootState) => state.adminTopMenus.topMenuDetail;
const getIsLoading = (state: RootState): Boolean => state.adminTopMenus.isLoading;


export const topMenusSelectors = {
  getTopMenusPagination,
  getTopMenus,
  getTopMenu,
  getIsLoading,
};
