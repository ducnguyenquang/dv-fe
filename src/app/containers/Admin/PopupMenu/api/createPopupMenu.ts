// import axios from 'utils/axios';

import { PopupMenuCreatePayload } from "models/popupMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createPopupMenu = async (popupMenu: PopupMenuCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createPopupMenuApi)
  const data = await api.post(popupMenu);
  return data;
};