import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  popupMenuPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  popupMenus: [],
  popupMenuDetail: {},
};

const popupMenusSlice = createSlice({
  name: 'adminPopupMenus',
  initialState,
  reducers: {
    setPopupMenusPagination: (state, { payload }) => {
      state.popupMenuPagination = payload.pagination;
    },
    setPopupMenus: (state, { payload }) => {
      state.popupMenus = payload.data;
      state.popupMenuPagination = payload.pagination;
    },
    setPopupMenuDetail: (state, { payload }) => {
      state.popupMenuDetail = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { name, actions, reducer } = popupMenusSlice;
