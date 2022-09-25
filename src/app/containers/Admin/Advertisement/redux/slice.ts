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
  advertisements: [],
  advertisementDetail: {},
};

const advertisementsSlice = createSlice({
  name: 'adminAdvertisements',
  initialState,
  reducers: {
    setAdvertisementsPagination: (state, { payload }) => {
      // state.categories = payload.data;
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
      // console.log('==== setProductDetail', payload)
      state.advertisementDetail = payload;
    },
  },
});

export const { name, actions, reducer } = advertisementsSlice;
