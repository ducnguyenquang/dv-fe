// import type { UploadFile } from 'antd/es/upload/interface';
import { UploadFile } from 'antd';

export interface Common {
  _id?: string;
  id?: string;
  name?: string;
  value?: string;
  type?: string;
  group?: string;
  active?: boolean;
  valueImages?: UploadFile[];
}

export type CommonCreatePayload = Pick<Common, 'name' | 'value' | 'type' | 'group' | 'active'>;
export type CommonCreatesPayload = {
  data: Common[];
};

export type CommonUpdatePayload = Pick<Common, 'name' | 'value' | 'type' | 'group' | 'active'>;
export type CommonUpdatesPayload = {
  data: Common[];
};

type CommonQueryBase = {
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

export type CommonQueryPayload = Partial<CommonQueryBase>;

export type CommonDetailPayload = Pick<Common, 'id'> & {
  _id?: string;
};

export type CommonDeletePayload = Pick<Common, 'id'>;

export type CommonUploadFilesPayload = Pick<Common, 'id'> & {
  files?: any;
};

export type AllCommonsQueryPayload = {
  search: string;
};
