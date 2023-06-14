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
  accessToken: storage.getAccessToken(),
  currentUser: storage.getCurrentUser(),
  // karcherEquipment: null,
  // originEquipmentDetail: {},
  // fileViewType: EquipmentFileView.LIST,
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEquipmentPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    // setModalData: (state, { payload: { modalName, modalData } }) => {
    //   state.modalsData[modalName] = modalData;
    // },
    // closeModals: state => {
    //   state.modalsData = modalsData;
    // },
    // setEquipmentsTableColumnOrder: (state, { payload }) => {
    //   storage.setEquipmentFilters(JSON.stringify(payload));
    //   state.equipmentsTableColumns = payload;
    // },
    // selectEquipment: (state, { payload }) => {
    //   state.selectedEquipment = state.selectedEquipment.concat(payload);
    // },
    // deselectEquipment: (state, { payload }) => {
    //   state.selectedEquipment = state.selectedEquipment.filter((e: Equipment) => e?.id !== payload?.id);
    // },
    // deselectAllEquipment: state => {
    //   state.selectedEquipment = [];
    // },
    setAccessToken: (state, { payload }) => {
      storage.setAccessToken(JSON.stringify(payload));
      state.accessToken = payload;
    },
    setCurrentUser: (state, { payload }) => {
      storage.setCurrentUser(JSON.stringify(payload));
      state.currentUser = payload;
    },
    // setKarcherEquipment: (state, { payload }) => {
    //   state.karcherEquipment = payload;
    // },
    // setOriginEquipmentDetail: (state, { payload }) => {
    //   state.originEquipmentDetail = payload;
    // },
    // setEquipmentFileView: (state, { payload }) => {
    //   state.fileViewType = payload;
    // },
  },
});

export const { name, actions, reducer } = usersSlice;
