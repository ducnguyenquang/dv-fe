// import axios from 'utils/axios';

import { PageQueryPayload } from "models/page";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getPages = async (page: PageQueryPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.getPagesApi)
  const data = await api.post(page);
  return data;
};