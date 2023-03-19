// import axios from 'utils/axios';

import { TagSeoQueryPayload } from "models/tagSeo";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getTagSeos = async (tagSeo: TagSeoQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getClientTagSeosApi)
  const { data } = await api.post(tagSeo);
  return data;
};