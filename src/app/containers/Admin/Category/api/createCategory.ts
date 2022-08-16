// import axios from 'utils/axios';

import { CategoryCreatePayload } from "models/category";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createCategory = async (category: CategoryCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createCategoryApi)
  const data = await api.post(category);
  return data;
};