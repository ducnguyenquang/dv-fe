import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
// import { TPagination } from 'models/pagination';
// import { initialState } from './slice';

const getAccessToken = (state: RootState): string => state.user.accessToken;
const getCurrentUser = (state: RootState): string => state.user.currentUser;
// const getEquipmentsModalsData = (state: RootState): typeof modalsData => state.equipments.modalsData;
// const getEquipmentsTableColumns = (state: RootState): typeof initialState.equipmentsTableColumns =>
//   state.equipments.equipmentsTableColumns;
// const getSelectedEquipment = (state: RootState): Array<Equipment> => state.equipments.selectedEquipment;
// const getEquipmentPagination = (state: RootState): TPagination => state.equipments.pagination;
// const getKarcherEquipment = (state: RootState): EquipmentKarcher => state.equipments.karcherEquipment;
// const getOriginEquipmentDetail = (state: RootState): Equipment => state.equipments.originEquipmentDetail;
// const getEquipmentFileView = (state: RootState): EquipmentFileView => state.equipments.fileViewType;

export const usersSelectors = {
  getAccessToken,
  getCurrentUser,
  // getEquipmentsModalsData,
  // getEquipmentsTableColumns,
  // getSelectedEquipment,
  // getEquipmentPagination,
  // getAccessToken,
  // getKarcherEquipment,
  // getOriginEquipmentDetail,
  // getEquipmentFileView,
};
