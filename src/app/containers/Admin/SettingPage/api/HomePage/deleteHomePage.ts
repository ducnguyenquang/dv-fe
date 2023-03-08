// import axios from 'utils/axios';

import { CommonDeletePayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteHomePage = async (homePage: CommonDeletePayload): Promise<any> => {
  if(homePage) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeCommonApi}/${homePage}`)
    const data = await api.get(homePage);
    return data;
  } else {
    return null;
  }
};