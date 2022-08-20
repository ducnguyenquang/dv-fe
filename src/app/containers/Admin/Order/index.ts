// Redux
export {
    actions as ordersActions,
    reducer as ordersReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { ordersSelectors } from './redux/selectors';
  export { ordersApi } from './api';
  export { ordersHooks } from './hooks';
//   export { getEquipmentNameDiscription, getFileNameFromUrl } from './helpers';
//   export { EquipmentsTable } from './components/EquipmentsTable';
//   export { EquipmentsTableBody } from './components/EquipmentsTableBody';
//   export { EquipmentsTableFilter } from './components/EquipmentsTableFilter';
//   export { EquipmentsEmptyPlaceholder } from './components/EquipmentsEmptyPlaceholder';
//   export { EquipmentFilesEmptyPlaceholder } from './components/EquipmentFilesEmptyPlaceholder';
//   export { EquipmentCreateModal } from './components/EquipmentCreateModal';
//   export { EquipmentDetails } from './components/EquipmentDetails';
  export { OrderTable as AdminOrderTable } from './components/OrderTable';
  // export { UserDetail as AdminUserDetail } from './components/UserDetail';
  export { OrderDetailForm as AdminOrderDetailForm } from './components/OrderDetail/components/OrderDetailForm';
  export { OrderAdd as AdminOrderAdd } from './components/OrderDetail/components/OrderAdd';
  export { OrderUpdate as AdminOrderUpdate } from './components/OrderDetail/components/OrderUpdate';
