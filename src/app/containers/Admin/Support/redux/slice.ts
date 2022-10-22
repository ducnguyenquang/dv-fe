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
  supports: [],
  supportDetail: {},
};

const supportsSlice = createSlice({
  name: 'adminSupports',
  initialState,
  reducers: {
    setSupportsPagination: (state, { payload }) => {
      // state.categories = payload.data;
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
      // console.log('==== setProductDetail', payload)
      state.supportDetail = payload;
    },
  },
});

export const { name, actions, reducer } = supportsSlice;
