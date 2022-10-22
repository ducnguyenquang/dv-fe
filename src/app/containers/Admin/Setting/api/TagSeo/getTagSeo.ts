// import axios from 'utils/axios';

import { TagSeoDetailPayload } from "models/tagSeo";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getTagSeo = async (tagSeo: TagSeoDetailPayload): Promise<any> => {
  if(tagSeo.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getTagSeoApi}/${tagSeo.id}`)
    const data = await api.get(tagSeo);
    return data;
  } else {
    return null;
  }
};