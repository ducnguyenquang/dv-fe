import type { RootState } from 'config/configureStore';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getUsersPagination = (state: RootState): TPagination => state.adminUsers.pagination;
const getUsers = (state: RootState): TPagination => state.adminUsers.users;
const getUser = (state: RootState) => state.adminUsers.userDetail;
const getIsLoading = (state: RootState): Boolean => state.adminUsers.isLoading;


export const usersSelectors = {
  getUsersPagination,
  getUsers,
  getIsLoading,
  getUser,
};
