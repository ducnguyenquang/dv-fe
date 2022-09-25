// Redux
export {
    actions as brandsActions,
    reducer as brandsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { brandsSelectors } from './redux/selectors';
  export { brandsApi } from './api';
  export { brandsHooks } from './hooks';
  export { BrandTable as AdminBrandTable } from './components/BrandTable';
  export { BrandDetailForm as AdminBrandDetailForm } from './components/BrandDetail/components/BrandDetailForm';
  export { BrandAdd as AdminBrandAdd } from './components/BrandDetail/components/BrandAdd';
  export { BrandUpdate as AdminBrandUpdate } from './components/BrandDetail/components/BrandUpdate';
