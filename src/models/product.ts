
import type { UploadFile } from 'antd/es/upload/interface';
import { Brand } from './brand';

import { Category } from "./category";

export interface Product {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  summary?: string;
  specification?: string;
  brand?: Brand;
  sku?: string;
  images?: UploadFile[];
  categories?: Category[];
  pricing?: number;
  type?: string;
  _id?: string;
}

export type RangeNumber = {
  min?: number,
  max?: number,
}

export type ProductFiltersId = {
  brands?: string[];
  review?: number;
  pricing?: number[];
  categories?: string[];
  types?: any[];
  ledAttributes?: string[];
}

export type ProductFilters = {
  brands?: Brand[];
  review?: number;
  pricing?: number[];
  categories?: Category[];
  types?: any[];
  ledAttributes?: any[];
}

export type ProductCreatePayload = Pick<
Product,
  'name' | 'slug' | 'description' | 'brand' | 'sku' | 'images' | 'categories' | 'summary' | 'specification'| 'type'
> & {
  sendActivationEmail: boolean;
};

export type ProductUpdatePayload = Pick<
  Product,
  'name' | 'slug' | 'description' | 'brand' | 'sku' | 'images' | 'categories' | 'id' | '_id' | 'summary' | 'specification' | 'type'
>;

type ProductQueryBase = {
  size?: number;
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    // id: string;
    // desc: boolean;
  };
  search?: {};
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


