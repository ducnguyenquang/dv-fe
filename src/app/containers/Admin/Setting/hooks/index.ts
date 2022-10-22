import { useTagSeos } from './TagSeo/useTagSeos';
import { useTagSeo } from './TagSeo/useTagSeo';
import { useCreateTagSeo } from './TagSeo/useCreateTagSeo';
import { useUpdateTagSeo } from './TagSeo/useUpdateTagSeo';
import { useDeleteTagSeo } from './TagSeo/useDeleteTagSeo';

import { usePopupMenus } from './PopupMenu/usePopupMenus';
import { usePopupMenu } from './PopupMenu/usePopupMenu';
import { useCreatePopupMenu } from './PopupMenu/useCreatePopupMenu';
import { useUpdatePopupMenu } from './PopupMenu/useUpdatePopupMenu';
import { useDeletePopupMenu } from './PopupMenu/useDeletePopupMenu';

import { useEmailTemplates } from './EmailTemplate/useEmailTemplates';
import { useEmailTemplate } from './EmailTemplate/useEmailTemplate';
import { useCreateEmailTemplate } from './EmailTemplate/useCreateEmailTemplate';
import { useUpdateEmailTemplate } from './EmailTemplate/useUpdateEmailTemplate';
import { useDeleteEmailTemplate } from './EmailTemplate/useDeleteEmailTemplate';

import { useAdvertisements } from './Advertisement/useAdvertisements';
import { useAdvertisement } from './Advertisement/useAdvertisement';
import { useCreateAdvertisement } from './Advertisement/useCreateAdvertisement';
import { useUpdateAdvertisement } from './Advertisement/useUpdateAdvertisement';
import { useDeleteAdvertisement } from './Advertisement/useDeleteAdvertisement';

export const settingsHooks = {
  useTagSeos,
  useCreateTagSeo,
  useTagSeo,
  useUpdateTagSeo,
  useDeleteTagSeo,

  usePopupMenus,
  usePopupMenu,
  useCreatePopupMenu,
  useUpdatePopupMenu,
  useDeletePopupMenu,

  useEmailTemplates,
  useEmailTemplate,
  useCreateEmailTemplate,
  useUpdateEmailTemplate,
  useDeleteEmailTemplate,

  useAdvertisements,
  useAdvertisement,
  useCreateAdvertisement,
  useUpdateAdvertisement,
  useDeleteAdvertisement
};
