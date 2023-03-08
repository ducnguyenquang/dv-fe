import type { RootState } from 'config/configureStore';
import { TPagination } from 'models/pagination';

const getTemplatesPagination = (state: RootState): TPagination => state.adminSettingPages.templatePagination;
const getTemplates = (state: RootState): TPagination => state.adminSettingPages.templates;
const getTemplate = (state: RootState) => state.adminSettingPages.templateDetail;

const getHomePagesPagination = (state: RootState): TPagination => state.adminSettingPages.homePagePagination;
const getHomePages = (state: RootState): TPagination => state.adminSettingPages.homePages;
const getHomePage = (state: RootState) => state.adminSettingPages.homePageDetail;

const getIsLoading = (state: RootState): Boolean => state.adminSettingPages.isLoading;


export const settingPagesSelectors = {
  getTemplatesPagination,
  getTemplates,
  getTemplate,

  getHomePagesPagination,
  getHomePages,
  getHomePage,

  getIsLoading,
};
