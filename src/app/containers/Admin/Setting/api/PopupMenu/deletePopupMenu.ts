// import axios from 'utils/axios';

import { PopupMenuDetailPayload } from "models/popupMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deletePopupMenu = async (popupMenu: PopupMenuDetailPayload): Promise<any> => {
  if(popupMenu) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removePopupMenuApi}/${popupMenu._id}`)
    const data = await api.get(popupMenu);
    return data;
  } else {
    return null;
  }
};