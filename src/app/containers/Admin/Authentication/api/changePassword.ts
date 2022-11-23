// import axios from 'utils/axios';

import { ChangePasswordPayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const changePassword = async (user: ChangePasswordPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.changePasswordApi)
  const data = await api.post(user);
  return data;
};