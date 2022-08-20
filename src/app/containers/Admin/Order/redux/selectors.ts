import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

// const getEquipmentsModalsData = (state: RootState): typeof modalsData => state.equipments.modalsData;
// const getEquipmentsTableColumns = (state: RootState): typeof initialState.equipmentsTableColumns =>
//   state.equipments.equipmentsTableColumns;
// const getSelectedEquipment = (state: RootState): Array<Equipment> => state.equipments.selectedEquipment;
// const getEquipmentPagination = (state: RootState): TPagination => state.equipments.pagination;
// const getAccessToken = (state: RootState): string => state.equipments.accessToken;
// const getKarcherEquipment = (state: RootState): EquipmentKarcher => state.equipments.karcherEquipment;
// const getOriginEquipmentDetail = (state: RootState): Equipment => state.equipments.originEquipmentDetail;
// const getEquipmentFileView = (state: RootState): EquipmentFileView => state.equipments.fileViewType;
const getOrdersPagination = (state: RootState): TPagination => state.adminOrders.pagination;
const getOrders = (state: RootState): TPagination => state.adminOrders.orders;
const getOrder = (state: RootState) => state.adminOrders.orderDetail;
const getIsLoading = (state: RootState): Boolean => state.adminOrders.isLoading;


export const ordersSelectors = {
  getOrdersPagination,
  getOrders,
  getIsLoading,
  getOrder,
};
