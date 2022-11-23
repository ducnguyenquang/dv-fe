import { ProductQueryPayload, ProductDetailPayload } from 'models/product';

import { getProducts } from './getProducts';
import { getProduct } from './getProduct';
import { createProduct } from './createProduct';
import { updateProduct } from './updateProduct';
import { getCaterogies } from './getCaterogies';
import { deleteProduct } from './deleteProduct';
import { getBrands } from './getBrands';
import { getSupports } from './getSupports';

export const productsKeys = {
  all: ['products'] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (params: ProductDetailPayload) => [...productsKeys.details(), { params }] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (params: ProductQueryPayload) => [...productsKeys.lists(), { params }] as const,
  supports: () => ['supports'] as const,
};

export const productsApi = {
  productsKeys,
  getProducts,
  createProduct,
  getCaterogies,
  getProduct,
  updateProduct,
  deleteProduct,
  getBrands,
  getSupports,
};
