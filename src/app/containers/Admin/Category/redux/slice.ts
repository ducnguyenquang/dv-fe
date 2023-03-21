import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  categories: [],
  categoryDetail: {},
};

const categoriesSlice = createSlice({
  name: 'adminCategories',
  initialState,
  reducers: {
    setCategoriesPagination: (state, { payload }) => {
      state.pagination = payload.pagination;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setCategoryDetail: (state, { payload }) => {
      state.categoryDetail = payload;
    },
  },
});

export const { name, actions, reducer } = categoriesSlice;
