// import type { UploadFile } from 'antd/es/upload/interface';

export interface Sku {
  id?: string;
  name?: string;
  subject?: string;
  body?: string;
  _id?: string;
}

export type SkuCreatePayload = Pick<Sku, 'name' | 'subject' | 'body'>;

export type SkuUpdatePayload = Pick<Sku, 'name' | 'subject' | 'body'>;

type SkuQueryBase = {
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

export type SkuQueryPayload = Partial<SkuQueryBase>;

export type SkuDetailPayload = Pick<Sku, 'id'> & {
  _id?: string;
};

export type SkuDeletePayload = Pick<Sku, 'id'>;

export type AllSkusQueryPayload = {
  search: string;
};
