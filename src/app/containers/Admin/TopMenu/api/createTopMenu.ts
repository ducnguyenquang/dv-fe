// import axios from 'utils/axios';

import { TopMenuCreatePayload } from "models/topMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createTopMenu = async (topMenu: TopMenuCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createTopMenuApi)
  const data = await api.post(topMenu);
  return data;
};