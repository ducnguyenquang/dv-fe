// Redux
export {
    actions as pagesActions,
    reducer as pagesReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { pagesSelectors } from './redux/selectors';
  export { pagesApi } from './api';
  export { pagesHooks } from './hooks';
  export { PageTable as AdminPageTable } from './components/PageTable';
  export { PageDetailForm as AdminPageDetailForm } from './components/PageDetail/components/PageDetailForm';
  export { PageAdd as AdminPageAdd } from './components/PageDetail/components/PageAdd';
  export { PageUpdate as AdminPageUpdate } from './components/PageDetail/components/PageUpdate';
