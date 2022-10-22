// import type { UploadFile } from 'antd/es/upload/interface';

export interface PopupMenu {
  id?: string;
  name?: string;
  icon?: string;
  url?: string;
  _id?: string;
}

export type PopupMenuCreatePayload = Pick<PopupMenu, 'name' | 'icon' | 'url'>;

export type PopupMenuUpdatePayload = Pick<PopupMenu, 'name' | 'icon' | 'url'>;

type PopupMenuQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    id: string;
    desc: boolean;
  };
  search?: {
    searchText: string;
    searchColumn: string;
  };
};

export type PopupMenuQueryPayload = Partial<PopupMenuQueryBase>;

export type PopupMenuDetailPayload = Pick<PopupMenu, 'id'> & {
  _id?: string;
};

export type PopupMenuDeletePayload = Pick<PopupMenu, 'id'>;

export type AllPopupMenusQueryPayload = {
  search: string;
};
