import { UserQueryPayload, UserDetailPayload } from 'models/user';

// import { fetchEquipments } from './fetchEquipments';
// import { fetchEquipment } from './fetchEquipment';
// import { createEquipment } from './createEquipment';
// import { uploadEquipmentImage } from './uploadEquipmentImage';
// import { editEquipment } from './editEquipment';
import { getOrders } from './getOrders';
import { getOrder } from './getOrder';
import { createOrder } from './createOrder';
import { updateOrder } from './updateOrder';
// import { getCaterogies } from './getCaterogies';
import { deleteOrder } from './deleteOrder';

export const ordersKeys = {
  all: ['users'] as const,
  details: () => [...ordersKeys.all, 'detail'] as const,
  detail: (params: UserDetailPayload) => [...ordersKeys.details(), { params }] as const,
  lists: () => [...ordersKeys.all, 'list'] as const,
  list: (params: UserQueryPayload) => [...ordersKeys.lists(), { params }] as const,
};

export const ordersApi = {
  ordersKeys,
  getOrders,
  createOrder,
  // getCaterogies,
  getOrder,
  updateOrder,
  deleteOrder,
};
