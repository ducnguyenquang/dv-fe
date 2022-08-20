import { useOrders } from './useOrders';
import { useOrder } from './useOrder';
import { useCreateOrder } from './useCreateOrder';
import { useUpdateOrder } from './useUpdateOrder';
import { useDeleteOrder } from './useDeleteOrder';


export const ordersHooks = {
  useOrders,
  useCreateOrder,
  useOrder,
  useUpdateOrder,
  useDeleteOrder,
};
