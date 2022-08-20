// Redux
export {
    actions as productsActions,
    reducer as productsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { productsSelectors } from './redux/selectors';
  export { productsApi } from './api';
  export { productsHooks } from './hooks';
  export { ProductTable as AdminProductTable } from './components/ProductTable';
  export { ProductDetailForm as AdminProductDetailForm } from './components/ProductDetail/components/ProductDetailForm';
  export { ProductAdd as AdminProductAdd } from './components/ProductDetail/components/ProductAdd';
  export { ProductUpdate as AdminProductUpdate } from './components/ProductDetail/components/ProductUpdate';
