import type { UploadFile } from 'antd/es/upload/interface';

export interface Brand {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  logo?: UploadFile[];
  _id?: string;
}

export type BrandCreatePayload = Pick<
Brand,
  'name' | 'slug' | 'description' | 'logo'
>;

export type BrandUpdatePayload = Pick<
Brand,
  'name' | 'slug' | 'description' | 'logo'
>;

type BrandQueryBase = {
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

export type BrandQueryPayload = Partial<BrandQueryBase>;

export type BrandDetailPayload = Pick<Brand, 'id'> & {
  _id?: string;
};

export type BrandDeletePayload = Pick<Brand, 'id'>;

export type AllBrandsQueryPayload = {
  search: string;
};
