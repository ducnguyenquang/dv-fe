// import axios from 'utils/axios';

import { PopupMenuDeletePayload } from "models/popupMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deletePopupMenu = async (popupMenu: PopupMenuDeletePayload): Promise<any> => {
  if(popupMenu) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removePopupMenuApi}/${popupMenu}`)
    const data = await api.get(popupMenu);
    return data;
  } else {
    return null;
  }
};