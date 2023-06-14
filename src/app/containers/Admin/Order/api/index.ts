import { UserQueryPayload, UserDetailPayload } from 'models/user';

import { getOrders } from './getOrders';
import { getOrder } from './getOrder';
import { createOrder } from './createOrder';
import { getClientOrders } from './getClientOrders';
import { getClientOrder } from './getClientOrder';
import { createClientOrder } from './createClientOrder';
import { updateOrder } from './updateOrder';
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
  getClientOrders,
  getClientOrder,
  createClientOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
