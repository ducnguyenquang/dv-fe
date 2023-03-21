import { LoginPayload } from "models/user";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const login = async (user: LoginPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.loginApi)
  const data = api.post(user, {})
  return {
    data: data,
  };
};
