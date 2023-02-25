// import axios from 'utils/axios';

import { TopMenuUpdatePayload } from "models/topMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateTopMenu = async (topMenu: TopMenuUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateTopMenuApi)
  const data = await api.post(topMenu);
  return data;
};