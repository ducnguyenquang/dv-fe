// import axios from 'utils/axios';

import { UserQueryPayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getUsers = async (user: UserQueryPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.getUsersApi)
  const data = await api.post(user);
  return data;
};