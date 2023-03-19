// import axios from 'utils/axios';

import { CommonQueryPayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getTemplates = async (template: CommonQueryPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.getClientCommonsApi)
  const { data } = await api.post(template);
  return data;
};