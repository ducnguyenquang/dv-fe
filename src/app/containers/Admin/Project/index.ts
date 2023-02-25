// Redux
export {
    actions as projectsActions,
    reducer as projectsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { projectsSelectors } from './redux/selectors';
  export { projectsApi } from './api';
  export { projectsHooks } from './hooks';
  export { ProjectTable as AdminProjectTable } from './components/ProjectTable';
  export { ProjectDetailForm as AdminProjectDetailForm } from './components/ProjectDetail/components/ProjectDetailForm';
  export { ProjectAdd as AdminProjectAdd } from './components/ProjectDetail/components/ProjectAdd';
  export { ProjectUpdate as AdminProjectUpdate } from './components/ProjectDetail/components/ProjectUpdate';
