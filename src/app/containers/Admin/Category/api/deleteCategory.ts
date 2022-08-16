// import axios from 'utils/axios';

import { CategoryDetailPayload } from "models/category";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteCategory = async (category: CategoryDetailPayload): Promise<any> => {
  if(category) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getCategoryApi}/remove/${category}`)
    const data = await api.get(category);
    return data;
  } else {
    return null;
  }
};