// import axios from 'utils/axios';

import { PopupMenuQueryPayload } from "models/popupMenu";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getPopupMenus = async (popupMenu: PopupMenuQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getPopupMenusApi)
  const { data } = await api.post(popupMenu);
  return data;
};