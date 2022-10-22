import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getSupportsPagination = (state: RootState): TPagination => state.adminSupports.pagination;
const getSupports = (state: RootState): TPagination => state.adminSupports.supports;
const getSupport = (state: RootState) => state.adminSupports.supportDetail;
const getIsLoading = (state: RootState): Boolean => state.adminSupports.isLoading;


export const supportsSelectors = {
  getSupportsPagination,
  getSupports,
  getSupport,
  getIsLoading,
};
