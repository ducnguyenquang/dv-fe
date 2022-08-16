
import type { UploadFile } from 'antd/es/upload/interface';

import { Category } from "./category";

export interface Product {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  brand?: string;
  sku?: string;
  images?: UploadFile[];
  categories?: Category[];
  _id?: string;
}

export type ProductCreatePayload = Pick<
Product,
  'name' | 'slug' | 'description' | 'brand' | 'sku' | 'images' | 'categories'
> & {
  sendActivationEmail: boolean;
};

export type ProductUpdatePayload = Pick<
  Product,
  'name' | 'slug' | 'description' | 'brand' | 'sku' | 'images' | 'categories' | 'id' | '_id' 
>;

type ProductQueryBase = {
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
  roles?: string[];
  states?: string[];
};

export type ProductQueryPayload = Partial<ProductQueryBase>;

export type ProductDetailPayload = Pick<Product, 'id'> & {
  category?: string;
  _id?: string;
};

export type ProductDeletePayload = Pick<Product, 'id'>;

export type AllProductsQueryPayload = {
  search: string;
};
