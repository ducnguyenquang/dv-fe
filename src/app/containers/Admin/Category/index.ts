// Redux
export {
    actions as categoriesActions,
    reducer as categoriesReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { categoriesSelectors } from './redux/selectors';
  export { categoriesApi } from './api';
  export { categoriesHooks } from './hooks';
//   export { getEquipmentNameDiscription, getFileNameFromUrl } from './helpers';
//   export { EquipmentsTable } from './components/EquipmentsTable';
//   export { EquipmentsTableBody } from './components/EquipmentsTableBody';
//   export { EquipmentsTableFilter } from './components/EquipmentsTableFilter';
//   export { EquipmentsEmptyPlaceholder } from './components/EquipmentsEmptyPlaceholder';
//   export { EquipmentFilesEmptyPlaceholder } from './components/EquipmentFilesEmptyPlaceholder';
//   export { EquipmentCreateModal } from './components/EquipmentCreateModal';
//   export { EquipmentDetails } from './components/EquipmentDetails';
  export { CategoryTable as AdminCategoryTable } from './components/CategoryTable';
  export { CategoryDetail as AdminCategoryDetail } from './components/CategoryDetail';
  export { CategoryDetailForm as AdminCategoryDetailForm } from './components/CategoryDetail/components/CategoryDetailForm';
  export { CategoryAdd as AdminCategoryAdd } from './components/CategoryDetail/components/CategoryAdd';
  export { CategoryUpdate as AdminCategoryUpdate } from './components/CategoryDetail/components/CategoryUpdate';
