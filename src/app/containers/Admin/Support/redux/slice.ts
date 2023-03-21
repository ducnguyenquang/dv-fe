import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  supports: [],
  supportDetail: {},
};

const supportsSlice = createSlice({
  name: 'adminSupports',
  initialState,
  reducers: {
    setSupportsPagination: (state, { payload }) => {
      state.pagination = payload.pagination;
    },
    setSupports: (state, { payload }) => {
      state.supports = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setSupportDetail: (state, { payload }) => {
      state.supportDetail = payload;
    },
  },
});

export const { name, actions, reducer } = supportsSlice;
