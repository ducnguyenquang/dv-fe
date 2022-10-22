import { EmailTemplateQueryPayload, EmailTemplateDetailPayload } from 'models/emailTemplate';

import { getEmailTemplates } from './getEmailTemplates';
import { getEmailTemplate } from './getEmailTemplate';
import { createEmailTemplate } from './createEmailTemplate';
import { updateEmailTemplate } from './updateEmailTemplate';
import { deleteEmailTemplate } from './deleteEmailTemplate';


export const emailTemplatesKeys = {
  all: ['emailTemplates'] as const,
  details: () => [...emailTemplatesKeys.all, 'detail'] as const,
  detail: (params: EmailTemplateDetailPayload) => [...emailTemplatesKeys.details(), { params }] as const,
  lists: () => [...emailTemplatesKeys.all, 'list'] as const,
  list: (params: EmailTemplateQueryPayload) => [...emailTemplatesKeys.lists(), { params }] as const,
};

export const emailTemplatesApi = {
  emailTemplatesKeys,
  getEmailTemplates,
  getEmailTemplate,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
};
