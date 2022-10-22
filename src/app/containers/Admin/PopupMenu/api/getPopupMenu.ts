// import axios from 'utils/axios';

import { PopupMenuDetailPayload } from "models/popupMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getPopupMenu = async (popupMenu: PopupMenuDetailPayload): Promise<any> => {
  if(popupMenu.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getPopupMenuApi}/${popupMenu.id}`)
    const data = await api.get(popupMenu);
    return data;
  } else {
    return null;
  }
};