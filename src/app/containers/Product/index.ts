// Redux
export {
    actions as productsActions,
    reducer as productsReducer,
  } from './redux/slice';
  export { productsSelectors } from './redux/selectors';
  export { productsApi } from './api';
  export { productsHooks } from './hooks';
  export { ProductList } from './components/ProductList';
  export { ProductDetail } from './components/ProductDetail';
  export { ProductFilter } from './components/ProductFilter';
  export { SupportMenu } from './components/SupportMenu';
