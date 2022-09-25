import type { UploadFile } from 'antd/es/upload/interface';

export interface Advertisement {
  id?: string;
  name?: string;
  url?: string;
  image?: UploadFile[];
  _id?: string;
}

export type AdvertisementCreatePayload = Pick<
Advertisement,
  'name' | 'url' | 'image'
>;

export type AdvertisementUpdatePayload = Pick<
Advertisement,
  'name' | 'url' | 'image'
>;

type AdvertisementQueryBase = {
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

export type AdvertisementQueryPayload = Partial<AdvertisementQueryBase>;

export type AdvertisementDetailPayload = Pick<Advertisement, 'id'> & {
  _id?: string;
};

export type AdvertisementDeletePayload = Pick<Advertisement, 'id'>;

export type AllAdvertisementsQueryPayload = {
  search: string;
};
