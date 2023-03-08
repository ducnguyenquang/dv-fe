// import type { UploadFile } from 'antd/es/upload/interface';

export interface EmailTemplate {
  id?: string;
  name?: string;
  subject?: string;
  body?: string;
  _id?: string;
}

export type EmailTemplateCreatePayload = Pick<EmailTemplate, 'name' | 'subject' | 'body'>;

export type EmailTemplateUpdatePayload = Pick<EmailTemplate, 'name' | 'subject' | 'body'>;

type EmailTemplateQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    id: string;
    desc: boolean;
  };
  search?: any;
};

export type EmailTemplateQueryPayload = Partial<EmailTemplateQueryBase>;

export type EmailTemplateDetailPayload = Pick<EmailTemplate, 'id'> & {
  _id?: string;
};

export type EmailTemplateDeletePayload = Pick<EmailTemplate, 'id'>;

export type AllEmailTemplatesQueryPayload = {
  search: string;
};
