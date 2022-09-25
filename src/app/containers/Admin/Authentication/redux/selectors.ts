import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getCurrentUser = (state: RootState): TPagination => state.adminAuthentications.pagination;
const getIsLoading = (state: RootState): Boolean => state.adminAuthentications.isLoading;


export const authenticationSelectors = {
  getCurrentUser,
  getIsLoading,
};
