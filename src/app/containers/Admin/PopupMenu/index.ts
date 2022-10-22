// Redux
export {
  actions as popupMenusActions,
  reducer as popupMenusReducer,
  // modalDataKeys as equipmentsModalDataKeys,
} from './redux/slice';
export { popupMenusSelectors } from './redux/selectors';
export { popupMenusApi } from './api';
export { popupMenusHooks } from './hooks';
export { PopupMenuTable as AdminPopupMenuTable } from './components/PopupMenuTable';
export { PopupMenuDetailForm as AdminPopupMenuDetailForm } from './components/PopupMenuDetail/components/DetailForm';
export { PopupMenuAdding as AdminPopupMenuAdd } from './components/PopupMenuDetail/components/Adding';
export { PopupMenuUpdating as AdminPopupMenuUpdate } from './components/PopupMenuDetail/components/Updating';


