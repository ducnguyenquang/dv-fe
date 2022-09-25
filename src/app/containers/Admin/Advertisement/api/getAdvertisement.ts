// import axios from 'utils/axios';

import { AdvertisementDetailPayload } from "models/advertisement";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getAdvertisement = async (advertisement: AdvertisementDetailPayload): Promise<any> => {
  if(advertisement.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getAdvertisementApi}/${advertisement.id}`)
    const data = await api.get(advertisement);
    return data;
  } else {
    return null;
  }
};