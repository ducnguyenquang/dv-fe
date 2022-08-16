// import { Equipment, EquipmentFileView } from 'Models/equipment';
import { createSlice } from '@reduxjs/toolkit';
import { storage } from 'utils';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  users: [],
  userDetail: {},
};

const usersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    setUsersPagination: (state, { payload }) => {
      state.users = payload.data;
      state.pagination = payload.pagination;
    },
    setUsers: (state, { payload }) => {
      state.users = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setUserDetail: (state, { payload }) => {
      state.userDetail = payload;
    },
  },
});

export const { name, actions, reducer } = usersSlice;
