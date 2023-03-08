import { CommonCreatePayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createTemplate = async (template: CommonCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createCommonApi)
  const data = await api.post(template);
  return data;
};