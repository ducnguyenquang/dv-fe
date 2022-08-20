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
  orders: [],
  orderDetail: {},
};

const ordersSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    setOrdersPagination: (state, { payload }) => {
      state.orders = payload.data;
      state.pagination = payload.pagination;
    },
    setOrders: (state, { payload }) => {
      state.orders = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setOrderDetail: (state, { payload }) => {
      state.orderDetail = payload;
    },
  },
});

export const { name, actions, reducer } = ordersSlice;
