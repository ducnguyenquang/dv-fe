import { CommonCreatesPayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createTemplates = async (template: CommonCreatesPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createCommonsApi)
  const data = await api.post(template);
  return data;
};