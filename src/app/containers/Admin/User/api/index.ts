import { UserQueryPayload, UserDetailPayload } from 'models/user';

// import { fetchEquipments } from './fetchEquipments';
// import { fetchEquipment } from './fetchEquipment';
// import { createEquipment } from './createEquipment';
// import { uploadEquipmentImage } from './uploadEquipmentImage';
// import { editEquipment } from './editEquipment';
import { getUsers } from './getUsers';
import { getUser } from './getUser';
import { createUser } from './createUser';
import { updateUser } from './updateUser';
// import { getCaterogies } from './getCaterogies';
import { deleteUser } from './deleteUser';

export const usersKeys = {
  all: ['users'] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  detail: (params: UserDetailPayload) => [...usersKeys.details(), { params }] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (params: UserQueryPayload) => [...usersKeys.lists(), { params }] as const,
};

export const usersApi = {
  usersKeys,
  getUsers,
  createUser,
  // getCaterogies,
  getUser,
  updateUser,
  deleteUser,
};
