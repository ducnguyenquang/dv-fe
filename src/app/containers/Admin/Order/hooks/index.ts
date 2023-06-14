import { useOrders } from './useOrders';
import { useOrder } from './useOrder';
import { useClientOrders } from './useClientOrders';
import { useClientOrder } from './useClientOrder';
import { useCreateOrder } from './useCreateOrder';
import { useCreateClienOrder } from './useCreateClienOrder';
import { useUpdateOrder } from './useUpdateOrder';
import { useDeleteOrder } from './useDeleteOrder';

export const ordersHooks = {
  useOrders,
  useCreateOrder,
  useClientOrders,
  useClientOrder,
  useCreateClienOrder,
  useOrder,
  useUpdateOrder,
  useDeleteOrder,
};
