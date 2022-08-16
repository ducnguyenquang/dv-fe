// import axios from 'utils/axios';

import { CategoryUpdatePayload } from "models/category";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateCategory = async (category: CategoryUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateCategoryApi)
  const data = await api.post(category);
  return data;
};