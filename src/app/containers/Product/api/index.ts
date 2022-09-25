import { ProductQueryPayload, ProductDetailPayload } from 'models/product';

// import { fetchEquipments } from './fetchEquipments';
// import { fetchEquipment } from './fetchEquipment';
// import { createEquipment } from './createEquipment';
// import { uploadEquipmentImage } from './uploadEquipmentImage';
// import { editEquipment } from './editEquipment';
import { getProducts } from './getProducts';
import { getProduct } from './getProduct';
import { createProduct } from './createProduct';
import { updateProduct } from './updateProduct';
import { getCaterogies } from './getCaterogies';
import { deleteProduct } from './deleteProduct';

export const productsKeys = {
  all: ['products'] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (params: ProductDetailPayload) => [...productsKeys.details(), { params }] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (params: ProductQueryPayload) => [...productsKeys.lists(), { params }] as const,
};

export const productsApi = {
  productsKeys,
  getProducts,
  createProduct,
  getCaterogies,
  getProduct,
  updateProduct,
  deleteProduct,
};
