import { LoginPayload } from 'models/user';

// import { fetchEquipments } from './fetchEquipments';
// import { fetchEquipment } from './fetchEquipment';
// import { createEquipment } from './createEquipment';
// import { uploadEquipmentImage } from './uploadEquipmentImage';
// import { editEquipment } from './editEquipment';
import { login } from './login';

export const authenticationKeys = {
  all: ['authentication'] as const,
  details: () => [...authenticationKeys.all, 'detail'] as const,
  // detail: (params: CategoryDetailPayload) => [...authenticationKeys.details(), { params }] as const,
  // lists: () => [...authenticationKeys.all, 'list'] as const,
  // list: (params: CategoryQueryPayload) => [...authenticationKeys.lists(), { params }] as const,
  login: (params: LoginPayload) => [...authenticationKeys.details(), { params }] as const,

};

export const authenticationApi = {
  authenticationKeys,
  login,
};
