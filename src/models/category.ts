import { UploadFile } from "antd";

export interface Category {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  images?: UploadFile[];
  _id?: string;
}

export type CategoryCreatePayload = Pick<
Category,
  'name' | 'slug' | 'description'
> & {
  sendActivationEmail: boolean;
};

export type CategoryUpdatePayload = Pick<
Category,
  'name' | 'slug' | 'description'
>;

type CategoryQueryBase = {
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
  roles?: string[];
  states?: string[];
};

export type CategoryQueryPayload = Partial<CategoryQueryBase>;

export type CategoryDetailPayload = Pick<Category, 'id'> & {
  _id?: string;
  slug?: string;
};

export type CategoryDeletePayload = Pick<Category, 'id'>;

export type AllCategoriesQueryPayload = {
  search: string;
};
