import { ProductQueryPayload } from 'models/product';

// import { fetchEquipments } from './fetchEquipments';
// import { fetchEquipment } from './fetchEquipment';
// import { createEquipment } from './createEquipment';
// import { uploadEquipmentImage } from './uploadEquipmentImage';
// import { editEquipment } from './editEquipment';
import { getProducts } from './getProducts';

export const productsKeys = {
  all: ['products'] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (id?: string) => [...productsKeys.details(), id] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (params: ProductQueryPayload) => [...productsKeys.lists(), { params }] as const,
};

export const productsApi = {
  productsKeys,
  getProducts,
};
