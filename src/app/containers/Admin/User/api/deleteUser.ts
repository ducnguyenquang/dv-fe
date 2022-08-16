// import axios from 'utils/axios';

import { UserDetailPayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteUser = async (user: UserDetailPayload): Promise<any> => {
  // console.log('==== deleteProduct product', product)
  if(user) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getUserApi}/remove/${user}`)
    const data = await api.get(user);
    return data;
  } else {
    return null;
  }
};