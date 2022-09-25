import { BrandQueryPayload, BrandDetailPayload } from 'models/brand';
import { getBrand } from './getBrand';
import { createBrand } from './createBrand';
import { updateBrand } from './updateBrand';
import { getBrands } from './getBrands';
import { deleteBrand } from './deleteBrand';

export const brandsKeys = {
  all: ['brands'] as const,
  details: () => [...brandsKeys.all, 'detail'] as const,
  detail: (params: BrandDetailPayload) => [...brandsKeys.details(), { params }] as const,
  lists: () => [...brandsKeys.all, 'list'] as const,
  list: (params: BrandQueryPayload) => [...brandsKeys.lists(), { params }] as const,
};

export const brandsApi = {
  brandsKeys,
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
