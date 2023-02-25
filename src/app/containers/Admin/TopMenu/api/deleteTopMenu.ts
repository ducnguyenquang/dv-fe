// import axios from 'utils/axios';

import { TopMenuDeletePayload } from "models/topMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteTopMenu = async (topMenu: TopMenuDeletePayload): Promise<any> => {
  if(topMenu) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeTopMenuApi}/${topMenu}`)
    const data = await api.get(topMenu);
    return data;
  } else {
    return null;
  }
};