// import axios from 'utils/axios';

import { AdvertisementQueryPayload } from "models/advertisement";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getAdvertisements = async (advertisement: AdvertisementQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getClientAdvertisementsApi)
  const { data } = await api.post(advertisement);
  return data;
};