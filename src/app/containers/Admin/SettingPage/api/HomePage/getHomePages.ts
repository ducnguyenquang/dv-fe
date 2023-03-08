// import axios from 'utils/axios';

import { CommonQueryPayload } from "models/common";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getHomePages = async (homePage: CommonQueryPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.getCommonsApi)
  const { data } = await api.post(homePage);
  return data;
};