// import axios from 'utils/axios';

import { AdvertisementCreatePayload } from "models/advertisement";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createAdvertisement = async (advertisement: AdvertisementCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createAdvertisementApi)
  const data = await api.post(advertisement);
  return data;
};