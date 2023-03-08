// import axios from 'utils/axios';

import { CommonDeletePayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteTemplate = async (template: CommonDeletePayload): Promise<any> => {
  if(template) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeCommonApi}/${template}`)
    const data = await api.get(template);
    return data;
  } else {
    return null;
  }
};