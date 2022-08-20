// Redux
export {
    actions as categoriesActions,
    reducer as categoriesReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { categoriesSelectors } from './redux/selectors';
  export { categoriesApi } from './api';
  export { categoriesHooks } from './hooks';
  export { CategoryTable as AdminCategoryTable } from './components/CategoryTable';
  export { CategoryDetailForm as AdminCategoryDetailForm } from './components/CategoryDetail/components/CategoryDetailForm';
  export { CategoryAdd as AdminCategoryAdd } from './components/CategoryDetail/components/CategoryAdd';
  export { CategoryUpdate as AdminCategoryUpdate } from './components/CategoryDetail/components/CategoryUpdate';
