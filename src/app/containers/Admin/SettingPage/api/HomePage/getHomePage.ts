// import axios from 'utils/axios';

import { CommonDetailPayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getHomePage = async (homePage: CommonDetailPayload): Promise<any> => {
  if(homePage.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getCommonApi}/${homePage.id}`)
    const data = await api.get(homePage);
    return data;
  } else {
    return null;
  }
};