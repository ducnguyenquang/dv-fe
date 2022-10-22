// Redux
export {
    actions as supportsActions,
    reducer as supportsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { supportsSelectors } from './redux/selectors';
  export { supportsApi } from './api';
  export { supportsHooks } from './hooks';
  export { SupportTable as AdminSupportTable } from './components/SupportTable';
  export { SupportDetailForm as AdminSupportDetailForm } from './components/SupportDetail/components/DetailForm';
  export { SupportAdd as AdminSupportAdd } from './components/SupportDetail/components/Adding';
  export { SupportUpdate as AdminSupportUpdate } from './components/SupportDetail/components/Updating';
