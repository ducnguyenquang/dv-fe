// import axios from 'utils/axios';

import { AdvertisementUpdatePayload } from "models/advertisement";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateAdvertisement = async (advertisement: AdvertisementUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateAdvertisementApi)
  const data = await api.post(advertisement);
  return data;
};