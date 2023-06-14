// import axios from 'utils/axios';

import { OrderQueryPayload } from "models/order";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getClientOrders = async (order: OrderQueryPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.getClientOrdersApi)
  const data = await api.post(order);
  return data;
};