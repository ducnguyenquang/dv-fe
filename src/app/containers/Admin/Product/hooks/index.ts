import { useProducts } from './useProducts';
import { useCategories } from './useCategories';
import { useProduct } from './useProduct';
import { useCreateProduct } from './useCreateProduct';
import { useUpdateProduct } from './useUpdateProduct';
import { useDeleteProduct } from './useDeleteProduct';


export const productsHooks = {
  useProducts,
  useCategories,
  useCreateProduct,
  useProduct,
  useUpdateProduct,
  useDeleteProduct,
};