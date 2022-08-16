// import axios from 'utils/axios';

import { UserDetailPayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getUser = async (user: UserDetailPayload): Promise<any> => {
  if(user.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getUserApi}/${user.id}`)
    const data = await api.get(user);
    return data;
  } else {
    return null;
  }
};