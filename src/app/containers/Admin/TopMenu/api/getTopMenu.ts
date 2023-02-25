// import axios from 'utils/axios';

import { TopMenuDetailPayload } from "models/topMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getTopMenu = async (topMenu: TopMenuDetailPayload): Promise<any> => {
  if(topMenu.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getTopMenuApi}/${topMenu.id}`)
    const data = await api.get(topMenu);
    return data;
  } else {
    return null;
  }
};