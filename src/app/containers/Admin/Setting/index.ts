// Redux
export {
  actions as settingsActions,
  reducer as settingsReducer,
  // modalDataKeys as equipmentsModalDataKeys,
} from './redux/slice';
export { settingsSelectors } from './redux/selectors';
export { settingsApi } from './api';
export { settingsHooks } from './hooks';
export { TagSeo } from './components/TagSeo';
export { Information } from './components/Information';
export { EmailTemplateTable } from './components/EmailTemplate/components/EmailTemplateTable';
export { EmailTemplateAdding } from './components/EmailTemplate/components/EmailTemplateDetail/components/Adding';
export { EmailTemplateUpdating } from './components/EmailTemplate/components/EmailTemplateDetail/components/Updating';


