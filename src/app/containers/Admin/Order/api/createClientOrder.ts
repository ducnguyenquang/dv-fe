// import axios from 'utils/axios';

import { OrderCreatePayload } from "models/order";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createClientOrder = async (order: OrderCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createClientOrderApi)
  const data = await api.post(order);
  return data;
};