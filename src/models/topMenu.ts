// import type { UploadFile } from 'antd/es/upload/interface';

import type { UploadFile } from 'antd/es/upload/interface';

export interface TopMenu {
  id?: string;
  name?: string;
  icon?: string;
  url?: string;
  _id?: string;
}

export type TopMenuCreatePayload = Pick<TopMenu, 'name' | 'icon' | 'url'>;

export type TopMenuUpdatePayload = Pick<TopMenu, 'name' | 'icon' | 'url'>;

type TopMenuQueryBase = {
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

export type TopMenuQueryPayload = Partial<TopMenuQueryBase>;

export type TopMenuDetailPayload = Pick<TopMenu, 'id'> & {
  _id?: string;
};

export type TopMenuDeletePayload = Pick<TopMenu, 'id'>;

export type AllTopMenusQueryPayload = {
  search: string;
};
