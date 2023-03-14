// import axios from 'utils/axios';

import { TopMenuQueryPayload } from "models/topMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getTopMenus = async (topMenu: TopMenuQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getTopMenusApi)
  const { data } = await api.post(topMenu);
  return data;
};