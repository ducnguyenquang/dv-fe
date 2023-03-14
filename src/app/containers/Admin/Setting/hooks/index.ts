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

import { useSkus } from './Sku/useSkus';
import { useSku } from './Sku/useSku';
import { useCreateSku } from './Sku/useCreateSku';
import { useUpdateSku } from './Sku/useUpdateSku';
import { useDeleteSku } from './Sku/useDeleteSku';

import { useRoutePaths } from './RoutePath/useRoutePaths';
import { useRoutePath } from './RoutePath/useRoutePath';
import { useCreateRoutePath } from './RoutePath/useCreateRoutePath';
import { useUpdateRoutePath } from './RoutePath/useUpdateRoutePath';
import { useDeleteRoutePath } from './RoutePath/useDeleteRoutePath';

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
  useDeleteAdvertisement,

  useSkus,
  useSku,
  useCreateSku,
  useUpdateSku,
  useDeleteSku,

  useRoutePaths,
  useRoutePath,
  useCreateRoutePath,
  useUpdateRoutePath,
  useDeleteRoutePath,
};
