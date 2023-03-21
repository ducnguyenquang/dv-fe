// import axios from 'utils/axios';

import { PageDetailPayload } from "models/page";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getPage = async (page: PageDetailPayload): Promise<any> => {
  if(page.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getPageApi}/${page.id}`)
    const data = await api.get(page);
    return data;
  } else {
    return null;
  }
};