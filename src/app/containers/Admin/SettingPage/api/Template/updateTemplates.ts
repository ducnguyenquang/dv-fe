// import axios from 'utils/axios';

import { CommonUpdatesPayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateTemplates = async (template: CommonUpdatesPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateCommonsApi)
  const data = await api.post(template);
  return data;
};