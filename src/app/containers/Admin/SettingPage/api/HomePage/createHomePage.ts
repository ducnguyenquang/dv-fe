// import axios from 'utils/axios';

import { CommonCreatePayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createHomePage = async (homePage: CommonCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createCommonApi)
  const data = await api.post(homePage);
  return data;
};