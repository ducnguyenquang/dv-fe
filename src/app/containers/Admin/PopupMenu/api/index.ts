import { EmailTemplateQueryPayload, EmailTemplateDetailPayload } from 'models/emailTemplate';

import { getPopupMenus } from './getPopupMenus';
import { getPopupMenu } from './getPopupMenu';
import { createPopupMenu } from './createPopupMenu';
import { updatePopupMenu } from './updatePopupMenu';
import { deletePopupMenu } from './deletePopupMenu';


export const popupMenusKeys = {
  all: ['popupMenus'] as const,
  details: () => [...popupMenusKeys.all, 'detail'] as const,
  detail: (params: EmailTemplateDetailPayload) => [...popupMenusKeys.details(), { params }] as const,
  lists: () => [...popupMenusKeys.all, 'list'] as const,
  list: (params: EmailTemplateQueryPayload) => [...popupMenusKeys.lists(), { params }] as const,
};

export const popupMenusApi = {
  popupMenusKeys,
  getPopupMenus,
  getPopupMenu,
  createPopupMenu,
  updatePopupMenu,
  deletePopupMenu,
};
