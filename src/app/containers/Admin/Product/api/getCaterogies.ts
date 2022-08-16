// import axios from 'utils/axios';

import { CategoryQueryPayload } from "models/category";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getCaterogies = async (category: CategoryQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getCategoriesApi)
  const data = await api.post(category);
  return data;
};