import { CategoryQueryPayload, CategoryDetailPayload } from 'models/category';

// import { fetchEquipments } from './fetchEquipments';
// import { fetchEquipment } from './fetchEquipment';
// import { createEquipment } from './createEquipment';
// import { uploadEquipmentImage } from './uploadEquipmentImage';
// import { editEquipment } from './editEquipment';
import { getCategory } from './getCategory';
import { createCategory } from './createCategory';
import { updateCategory } from './updateCategory';
import { getCategories } from './getCategories';
import { deleteCategory } from './deleteCategory';

export const categoriesKeys = {
  all: ['categories'] as const,
  details: () => [...categoriesKeys.all, 'detail'] as const,
  detail: (params: CategoryDetailPayload) => [...categoriesKeys.details(), { params }] as const,
  lists: () => [...categoriesKeys.all, 'list'] as const,
  list: (params: CategoryQueryPayload) => [...categoriesKeys.lists(), { params }] as const,
};

export const categoriesApi = {
  categoriesKeys,
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
