import type { UploadFile } from 'antd/es/upload/interface';

export interface Support {
  id?: string;
  name?: string;
  title?: string;
  phone?: string;
  _id?: string;
}

export type SupportCreatePayload = Pick<
Support,
  'name' | 'title' | 'phone'
>;

export type SupportUpdatePayload = Pick<
Support,
'name' | 'title' | 'phone'
>;

type SupportQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    id: string;
    desc: boolean;
  };
  search?: string;
};

export type SupportQueryPayload = Partial<SupportQueryBase>;

export type SupportDetailPayload = Pick<Support, 'id'> & {
  _id?: string;
};

export type SupportDeletePayload = Pick<Support, 'id'>;

export type AllSupportsQueryPayload = {
  search: string;
};
