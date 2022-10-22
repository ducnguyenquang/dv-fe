// import axios from 'utils/axios';

import { TagSeoCreatePayload } from "models/tagSeo";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createTagSeo = async (tagSeo: TagSeoCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createTagSeoApi)
  const data = await api.post(tagSeo);
  return data;
};