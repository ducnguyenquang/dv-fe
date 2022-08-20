// import axios from 'utils/axios';

import { OrderUpdatePayload } from "models/order";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateOrder = async (order: OrderUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateOrderApi)
  const data = await api.post(order);
  return data;
};