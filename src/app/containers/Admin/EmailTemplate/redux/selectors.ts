import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getEmailTemplatesPagination = (state: RootState): TPagination => state.adminEmailTemplates.emailTemplatePagination;
const getEmailTemplates = (state: RootState): TPagination => state.adminEmailTemplates.emailTemplates;
const getEmailTemplate = (state: RootState) => state.adminEmailTemplates.emailTemplateDetail;
const getIsLoading = (state: RootState): Boolean => state.adminEmailTemplates.isLoading;


export const emailTemplatesSelectors = {
  getEmailTemplatesPagination,
  getEmailTemplates,
  getEmailTemplate,
  getIsLoading,
};
