import type { RootState } from 'config/configureStore';
// import { Equipment, EquipmentKarcher, EquipmentFileView } from 'models/product';
import { TPagination } from 'models/pagination';
import { initialState } from './slice';

const getTagSeosPagination = (state: RootState): TPagination => state.adminSettings.tagSeoPagination;
const getTagSeos = (state: RootState): TPagination => state.adminSettings.tagSeos;
const getTagSeo = (state: RootState) => state.adminSettings.tagSeoDetail;

const getPopupMenusPagination = (state: RootState): TPagination => state.adminSettings.popupMenuPagination;
const getPopupMenus = (state: RootState): TPagination => state.adminSettings.popupMenus;
const getPopupMenu = (state: RootState) => state.adminSettings.popupMenuDetail;
const getPopupMenuOpened = (state: RootState) => state.adminSettings.popupMenuOpened;

const getEmailTemplatesPagination = (state: RootState): TPagination => state.adminSettings.emailTemplatePagination;
const getEmailTemplates = (state: RootState): TPagination => state.adminSettings.emailTemplates;
const getEmailTemplate = (state: RootState) => state.adminSettings.emailTemplateDetail;

const getAdvertisementsPagination = (state: RootState): TPagination => state.adminSettings.advertisementPagination;
const getAdvertisements = (state: RootState): TPagination => state.adminSettings.advertisements;
const getAdvertisement = (state: RootState) => state.adminSettings.advertisementDetail;

const getTopMenusPagination = (state: RootState): TPagination => state.adminSettings.topMenuPagination;
const getTopMenus = (state: RootState): TPagination => state.adminSettings.topMenus;
const getTopMenu = (state: RootState) => state.adminSettings.topMenuDetail;

const getIsLoading = (state: RootState): Boolean => state.adminSettings.isLoading;


export const settingsSelectors = {
  getTagSeosPagination,
  getTagSeos,
  getTagSeo,

  getPopupMenusPagination,
  getPopupMenus,
  getPopupMenu,
  getPopupMenuOpened,

  getEmailTemplatesPagination,
  getEmailTemplates,
  getEmailTemplate,

  getAdvertisementsPagination,
  getAdvertisements,
  getAdvertisement,

  getTopMenusPagination,
  getTopMenus,
  getTopMenu,

  getIsLoading,
};
