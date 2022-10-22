// import axios from 'utils/axios';

import { TagSeoDetailPayload } from "models/tagSeo";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteTagSeo = async (tagSeo: TagSeoDetailPayload): Promise<any> => {
  console.log('==== deleteTagSeo TagSeo', tagSeo)
  if(tagSeo) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeTagSeoApi}/${tagSeo._id}`)
    const data = await api.get(tagSeo);
    return data;
  } else {
    return null;
  }
};