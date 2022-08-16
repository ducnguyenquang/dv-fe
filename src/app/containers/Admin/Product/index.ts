// Redux
export {
    actions as productsActions,
    reducer as productsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { productsSelectors } from './redux/selectors';
  export { productsApi } from './api';
  export { productsHooks } from './hooks';
//   export { getEquipmentNameDiscription, getFileNameFromUrl } from './helpers';
//   export { EquipmentsTable } from './components/EquipmentsTable';
//   export { EquipmentsTableBody } from './components/EquipmentsTableBody';
//   export { EquipmentsTableFilter } from './components/EquipmentsTableFilter';
//   export { EquipmentsEmptyPlaceholder } from './components/EquipmentsEmptyPlaceholder';
//   export { EquipmentFilesEmptyPlaceholder } from './components/EquipmentFilesEmptyPlaceholder';
//   export { EquipmentCreateModal } from './components/EquipmentCreateModal';
//   export { EquipmentDetails } from './components/EquipmentDetails';
  export { ProductTable as AdminProductTable } from './components/ProductTable';
  export { ProductDetail as AdminProductDetail } from './components/ProductDetail';
  export { ProductDetailForm as AdminProductDetailForm } from './components/ProductDetail/components/ProductDetailForm';
  export { ProductAdd as AdminProductAdd } from './components/ProductDetail/components/ProductAdd';
  export { ProductUpdate as AdminProductUpdate } from './components/ProductDetail/components/ProductUpdate';
