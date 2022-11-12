import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  advertisements: [],
  advertisementDetail: {},
};

const advertisementsSlice = createSlice({
  name: 'adminAdvertisements',
  initialState,
  reducers: {
    setAdvertisementsPagination: (state, { payload }) => {
      state.pagination = payload.pagination;
    },
    setAdvertisements: (state, { payload }) => {
      state.advertisements = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAdvertisementDetail: (state, { payload }) => {
      state.advertisementDetail = payload;
    },
  },
});

export const { name, actions, reducer } = advertisementsSlice;
