// import { Equipment, EquipmentFileView } from 'Models/equipment';
import { createSlice } from '@reduxjs/toolkit';
import { storage } from 'utils';

// export const modalDataKeys = {
//   createEquipment: 'createEquipment',
//   addEquipmentImage: 'addEquipmentImage',
//   importCsv: 'importCsv',
// };

// export const modalsData = {
//   [modalDataKeys.createEquipment]: null,
//   [modalDataKeys.addEquipmentImage]: null,
//   [modalDataKeys.importCsv]: null,
// };

// const equipmentFiltersData = storage.getEquipmentFilters();

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
  filters: undefined,
  filtersApply: undefined,
};

const productsSlice = createSlice({
  name: 'products',
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
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    setFiltersApply: (state, { payload }) => {
      state.filtersApply = payload;
    },
  },
});

export const { name, actions, reducer } = productsSlice;
