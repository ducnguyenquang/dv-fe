import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  topMenuPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  topMenus: [],
  topMenuDetail: {},
};

const topMenusSlice = createSlice({
  name: 'adminTopMenus',
  initialState,
  reducers: {
    setTopMenusPagination: (state, { payload }) => {
      state.topMenuPagination = payload.pagination;
    },
    setTopMenus: (state, { payload }) => {
      state.topMenus = payload.data;
      state.topMenuPagination = payload.pagination;
    },
    setTopMenuDetail: (state, { payload }) => {
      state.topMenuDetail = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { name, actions, reducer } = topMenusSlice;
