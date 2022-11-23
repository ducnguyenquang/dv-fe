// Redux
export {
    actions as productsActions,
    reducer as productsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { productsSelectors } from './redux/selectors';
  export { productsApi } from './api';
  export { productsHooks } from './hooks';
  export { ProductList } from './components/ProductList';
  export { ProductDetail } from './components/ProductDetail';
  export { ProductFilter } from './components/ProductFilter';
  export { SupportMenu } from './components/SupportMenu';


  // export { ProductDetailForm as AdminProductDetailForm } from './components/ProductDetail/components/ProductDetailForm';
  // export { ProductAdd as AdminProductAdd } from './components/ProductDetail/components/ProductAdd';
  // export { ProductUpdate as AdminProductUpdate } from './components/ProductDetail/components/ProductUpdate';
