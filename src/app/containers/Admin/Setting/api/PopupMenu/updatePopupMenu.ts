// import axios from 'utils/axios';

import { PopupMenuUpdatePayload } from "models/popupMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updatePopupMenu = async (popupMenu: PopupMenuUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updatePopupMenuApi)
  const data = await api.post(popupMenu);
  return data;
};