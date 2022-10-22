// import axios from 'utils/axios';

import { TagSeoUpdatePayload } from "models/tagSeo";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateTagSeo = async (tagSeo: TagSeoUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateTagSeoApi)
  const data = await api.post(tagSeo);
  return data;
};