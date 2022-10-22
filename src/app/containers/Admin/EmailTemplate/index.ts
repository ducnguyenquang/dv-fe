// Redux
export {
  actions as emailTemplatesActions,
  reducer as emailTemplatesReducer,
  // modalDataKeys as equipmentsModalDataKeys,
} from './redux/slice';
export { emailTemplatesSelectors } from './redux/selectors';
export { emailTemplatesApi } from './api';
export { emailTemplatesHooks } from './hooks';
export { EmailTemplateTable as AdminEmailTemplateTable } from './components/EmailTemplateTable';
export { EmailTemplateDetailForm as AdminEmailTemplateDetailForm } from './components/EmailTemplateDetail/components/DetailForm';
export { EmailTemplateAdding as AdminEmailTemplateAdd } from './components/EmailTemplateDetail/components/Adding';
export { EmailTemplateUpdating as AdminEmailTemplateUpdate } from './components/EmailTemplateDetail/components/Updating';


