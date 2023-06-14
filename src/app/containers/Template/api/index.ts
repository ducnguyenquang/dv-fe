import { getTagSeos } from './getTagSeos';
import { getAdvertisements } from './getAdvertisements';
import { getPopupMenus } from './getPopupMenus';
import { getTopMenus } from './getTopMenus';
import { getTemplates } from './getTemplates';
import { getTemplate } from './getTemplate';
import { CommonDetailPayload, CommonQueryPayload } from 'models/common';
import { getCategories } from './getCategories';
import { getCategory } from './getCategory';
import { getProducts } from './getProducts';
import { getProduct } from './getProduct';
import { getProjects } from './getProjects';
import { getProject } from './getProject';
import { getSupports } from './getSupports';
import { createContact } from './createContact';
import { getSearches } from './getSearches';

export const templateKeys = {
  all: ['template'] as const,
  details: () => [...templateKeys.all, 'detail'] as const,
  detail: (params: CommonDetailPayload) => [...templateKeys.details(), { params }] as const,
  lists: () => [...templateKeys.all, 'list'] as const,
  list: (params: CommonQueryPayload) => [...templateKeys.lists(), { params }] as const,
};

export const templatesApi = {
  templateKeys,
  getTagSeos,
  getAdvertisements,
  getPopupMenus,
  getTopMenus,
  getTemplates,
  getTemplate,
  getCategories,
  getCategory,
  getProducts,
  getProduct,
  getProjects,
  getProject,
  getSupports,
  createContact,
  getSearches,
};
