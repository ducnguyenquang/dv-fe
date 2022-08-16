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
  // modalsData,
  // equipmentsTableColumns: {
  //   columnOrder: equipmentFiltersData ? JSON.parse(equipmentFiltersData)?.columnOrder : [],
  //   hiddenColumns: equipmentFiltersData ? JSON.parse(equipmentFiltersData)?.hiddenColumns : [],
  // },
  // selectedEquipment: [],
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  // accessToken: storage.getAccessToken(),
  // karcherEquipment: null,
  // originEquipmentDetail: {},
  // fileViewType: EquipmentFileView.LIST,
  products: [],
  productDetail: {},
};

const productsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    setProductsPagination: (state, { payload }) => {
      // state.products = payload.data;
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
      // console.log('==== setProductDetail', payload)
      state.productDetail = payload;
    },
  },
});

export const { name, actions, reducer } = productsSlice;
