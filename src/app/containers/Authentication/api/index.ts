// import { LoginPayload } from 'models/user';

// import { fetchEquipments } from './fetchEquipments';
// import { fetchEquipment } from './fetchEquipment';
// import { createEquipment } from './createEquipment';
// import { uploadEquipmentImage } from './uploadEquipmentImage';
// import { editEquipment } from './editEquipment';
import { login } from './login';

export const usersKeys = {
  all: ['user'] as const,
  // details: () => [...productsKeys.all, 'detail'] as const,
  // detail: (id?: string) => [...productsKeys.details(), id] as const,
  // lists: () => [...productsKeys.all, 'list'] as const,
  // list: (params: ProductQueryPayload) => [...productsKeys.lists(), { params }] as const,
};

export const usersApi = {
  usersKeys,
  // getProducts,
  login,
};
