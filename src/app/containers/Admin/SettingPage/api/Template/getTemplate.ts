// import axios from 'utils/axios';

import { CommonDetailPayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getTemplate = async (template: CommonDetailPayload): Promise<any> => {
  if(template.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getCommonApi}/${template.id}`)
    const data = await api.get(template);
    return data;
  } else {
    return null;
  }
};