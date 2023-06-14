// import axios from 'utils/axios';

import { OrderDetailPayload } from "models/order";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getClientOrder = async (order: OrderDetailPayload): Promise<any> => {
  if(order.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getClientOrderApi}/${order.id}`)
    const data = await api.get(order);
    return data;
  } else {
    return null;
  }
};