import type { RootState } from 'config/configureStore';
import storage, { CookiesResponse } from 'utils/storage';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
// import { TPagination } from 'models/pagination';
import { initialState } from './slice';  

// const getStorageCurrentUser = () => {
//   storage.getCurrentUser() ? JSON.parse(storage.getCurrentUser() as string) : undefined
// }
const getCurrentUser = (state: RootState): string => state.adminAuthentications.currentUser || storage.getCurrentUser() || initialState.currentUser;
const getAccessToken = (state: RootState): any => state.adminAuthentications.accessToken || storage.getAccessToken() || initialState.accessToken;
const getClientCurrentUser = (state: RootState): string => state.adminAuthentications.clientCurrentUser || storage.getClientCurrentUser() || initialState.clientCurrentUser;
const getClientAccessToken = (state: RootState): any => state.adminAuthentications.clientAccessToken || storage.getClientAccessToken() || initialState.clientAccessToken;

const getAvatarUser = (state: RootState): string => storage.getAvatarUser() || initialState.avatarUser;
// const getAccessToken = (state: RootState): any => storage.getAccessToken() || initialState.accessToken;
const getIsLoading = (state: RootState): Boolean => state.adminAuthentications.isLoading;


export const authenticationSelectors = {
  getCurrentUser,
  getAccessToken,
  getAvatarUser,
  getIsLoading,
  getClientCurrentUser,
  getClientAccessToken
};
