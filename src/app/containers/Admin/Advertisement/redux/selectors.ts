import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getAdvertisementsPagination = (state: RootState): TPagination => state.adminAdvertisements.pagination;
const getAdvertisements = (state: RootState): TPagination => state.adminAdvertisements.advertisements;
const getAdvertisement = (state: RootState) => state.adminAdvertisements.advertisementDetail;
const getIsLoading = (state: RootState): Boolean => state.adminAdvertisements.isLoading;


export const advertisementsSelectors = {
  getAdvertisementsPagination,
  getAdvertisements,
  getAdvertisement,
  getIsLoading,
};
