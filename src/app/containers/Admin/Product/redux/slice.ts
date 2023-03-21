import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  products: [],
  productDetail: {},
};

const productsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    setProductsPagination: (state, { payload }) => {
      state.pagination = payload.pagination;
    },
    setProducts: (state, { payload }) => {
      state.products = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setProductDetail: (state, { payload }) => {
      state.productDetail = payload;
    },
  },
});

export const { name, actions, reducer } = productsSlice;
