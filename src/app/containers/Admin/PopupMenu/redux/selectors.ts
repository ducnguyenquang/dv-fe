import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getPopupMenusPagination = (state: RootState): TPagination => state.adminPopupMenus.popupMenuPagination;
const getPopupMenus = (state: RootState): TPagination => state.adminPopupMenus.popupMenus;
const getPopupMenu = (state: RootState) => state.adminPopupMenus.popupMenuDetail;
const getIsLoading = (state: RootState): Boolean => state.adminPopupMenus.isLoading;


export const popupMenusSelectors = {
  getPopupMenusPagination,
  getPopupMenus,
  getPopupMenu,
  getIsLoading,
};
