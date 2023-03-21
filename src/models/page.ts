import type { UploadFile } from 'antd/es/upload/interface';

export interface Page {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  _id?: string;
}

export type PageCreatePayload = Pick<
Page,
  'name' | 'slug' | 'description'
>;

export type PageUpdatePayload = Pick<
Page,
  'name' | 'slug' | 'description'
>;

type PageQueryBase = {
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

export type PageQueryPayload = Partial<PageQueryBase>;

export type PageDetailPayload = Pick<Page, 'id'> & {
  _id?: string;
};

export type PageDeletePayload = Pick<Page, 'id'>;

export type AllPagesQueryPayload = {
  search: string;
};
