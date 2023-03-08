// import axios from 'utils/axios';

import { CommonUpdatePayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateTemplate = async (template: CommonUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateCommonApi)
  const data = await api.post(template);
  return data;
};