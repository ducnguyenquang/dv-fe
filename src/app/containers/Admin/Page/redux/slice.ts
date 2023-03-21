import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  pages: [],
  pageDetail: {},
};

const pagesSlice = createSlice({
  name: 'adminPages',
  initialState,
  reducers: {
    setPagesPagination: (state, { payload }) => {
      state.pagination = payload.pagination;
    },
    setPages: (state, { payload }) => {
      state.pages = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setPageDetail: (state, { payload }) => {
      state.pageDetail = payload;
    },
  },
});

export const { name, actions, reducer } = pagesSlice;
