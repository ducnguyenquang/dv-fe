// import axios from 'utils/axios';

import { UserUpdatePayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateUser = async (user: UserUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateUserApi)
  const data = await api.post(user);
  return data;
};