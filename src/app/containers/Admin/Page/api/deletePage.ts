// import axios from 'utils/axios';

import { PageDetailPayload } from "models/page";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deletePage = async (page: PageDetailPayload): Promise<any> => {
  if (page) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getPageApi}/remove/${page}`)
    const data = await api.get(page);
    return data;
  } else {
    return null;
  }
};