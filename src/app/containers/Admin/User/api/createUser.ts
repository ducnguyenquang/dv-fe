// import axios from 'utils/axios';

import { UserCreatePayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createUser = async (user: UserCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createUserApi)
  const data = await api.post(user);
  return data;
};