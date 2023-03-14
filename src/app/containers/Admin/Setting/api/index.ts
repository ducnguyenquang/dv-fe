import { TagSeoQueryPayload, TagSeoDetailPayload } from 'models/tagSeo';

import { getTagSeos } from './TagSeo/getTagSeos';
import { getTagSeo } from './TagSeo/getTagSeo';
import { createTagSeo } from './TagSeo/createTagSeo';
import { updateTagSeo } from './TagSeo/updateTagSeo';
import { deleteTagSeo } from './TagSeo/deleteTagSeo';
import { getPopupMenus } from './PopupMenu/getPopupMenus';
import { getPopupMenu } from './PopupMenu/getPopupMenu';
import { createPopupMenu } from './PopupMenu/createPopupMenu';
import { updatePopupMenu } from './PopupMenu/updatePopupMenu';
import { deletePopupMenu } from './PopupMenu/deletePopupMenu';

import { getEmailTemplates } from './EmailTemplate/getEmailTemplates';
import { getEmailTemplate } from './EmailTemplate/getEmailTemplate';
import { createEmailTemplate } from './EmailTemplate/createEmailTemplate';
import { updateEmailTemplate } from './EmailTemplate/updateEmailTemplate';
import { deleteEmailTemplate } from './EmailTemplate/deleteEmailTemplate';

import { getAdvertisements } from './Advertisement/getAdvertisements';
import { getAdvertisement } from './Advertisement/getAdvertisement';
import { createAdvertisement } from './Advertisement/createAdvertisement';
import { updateAdvertisement } from './Advertisement/updateAdvertisement';
import { deleteAdvertisement } from './Advertisement/deleteAdvertisement';

import { getSkus } from './Sku/getSkus';
import { getSku } from './Sku/getSku';
import { createSku } from './Sku/createSku';
import { updateSku } from './Sku/updateSku';
import { deleteSku } from './Sku/deleteSku';

import { getRoutePaths } from './RoutePath/getRoutePaths';
import { getRoutePath } from './RoutePath/getRoutePath';
import { createRoutePath } from './RoutePath/createRoutePath';
import { updateRoutePath } from './RoutePath/updateRoutePath';
import { deleteRoutePath } from './RoutePath/deleteRoutePath';

export const settingsKeys = {
  all: ['settings'] as const,
  details: () => [...settingsKeys.all, 'detail'] as const,
  detail: (params: TagSeoDetailPayload) => [...settingsKeys.details(), { params }] as const,
  lists: () => [...settingsKeys.all, 'list'] as const,
  list: (params: TagSeoQueryPayload) => [...settingsKeys.lists(), { params }] as const,
};

export const settingsApi = {
  settingsKeys,

  getTagSeos,
  createTagSeo,
  getTagSeo,
  updateTagSeo,
  deleteTagSeo,

  getPopupMenus,
  getPopupMenu,
  createPopupMenu,
  updatePopupMenu,
  deletePopupMenu,

  getEmailTemplates,
  getEmailTemplate,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,

  getAdvertisements,
  getAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,

  getSkus,
  getSku,
  createSku,
  updateSku,
  deleteSku,

  getRoutePaths,
  getRoutePath,
  createRoutePath,
  updateRoutePath,
  deleteRoutePath,
};
