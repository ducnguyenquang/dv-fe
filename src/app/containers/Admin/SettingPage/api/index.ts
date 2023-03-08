import { CommonQueryPayload, CommonDetailPayload } from 'models/common';

import { getTemplate } from './Template/getTemplate';
import { getTemplates } from './Template/getTemplates';
import { createTemplate } from './Template/createTemplate';
import { createTemplates } from './Template/createTemplates';
import { updateTemplate } from './Template/updateTemplate';
import { updateTemplates } from './Template/updateTemplates';
import { deleteTemplate } from './Template/deleteTemplate';
import { uploadFiles } from './Template/uploadFiles';

export const settingPagesKeys = {
  all: ['settingPages'] as const,
  details: () => [...settingPagesKeys.all, 'detail'] as const,
  detail: (params: CommonDetailPayload) => [...settingPagesKeys.details(), { params }] as const,
  lists: () => [...settingPagesKeys.all, 'list'] as const,
  list: (params: CommonQueryPayload) => [...settingPagesKeys.lists(), { params }] as const,
};

export const settingPagesApi = {
  settingPagesKeys,
  getTemplate,
  getTemplates,
  createTemplate,
  createTemplates,
  updateTemplate,
  updateTemplates,
  deleteTemplate,
  uploadFiles,
};
