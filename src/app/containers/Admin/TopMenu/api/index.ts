import { EmailTemplateQueryPayload, EmailTemplateDetailPayload } from 'models/emailTemplate';

import { getTopMenus } from './getTopMenus';
import { getTopMenu } from './getTopMenu';
import { createTopMenu } from './createTopMenu';
import { updateTopMenu } from './updateTopMenu';
import { deleteTopMenu } from './deleteTopMenu';


export const topMenusKeys = {
  all: ['topMenus'] as const,
  details: () => [...topMenusKeys.all, 'detail'] as const,
  detail: (params: EmailTemplateDetailPayload) => [...topMenusKeys.details(), { params }] as const,
  lists: () => [...topMenusKeys.all, 'list'] as const,
  list: (params: EmailTemplateQueryPayload) => [...topMenusKeys.lists(), { params }] as const,
};

export const topMenusApi = {
  topMenusKeys,
  getTopMenus,
  getTopMenu,
  createTopMenu,
  updateTopMenu,
  deleteTopMenu,
};
