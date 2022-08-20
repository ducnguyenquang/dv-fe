// import axios from 'utils/axios';

import { OrderDetailPayload } from "models/order";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteOrder = async (order: OrderDetailPayload): Promise<any> => {
  // console.log('==== deleteProduct product', product)
  if(order) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getOrderApi}/remove/${order}`)
    const data = await api.get(order);
    return data;
  } else {
    return null;
  }
};