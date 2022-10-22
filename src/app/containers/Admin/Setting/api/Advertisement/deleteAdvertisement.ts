// import axios from 'utils/axios';

import { AdvertisementDetailPayload } from "models/advertisement";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteAdvertisement = async (Advertisement: AdvertisementDetailPayload): Promise<any> => {
  if(Advertisement) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeAdvertisementApi}/${Advertisement._id}`)
    const data = await api.get(Advertisement);
    return data;
  } else {
    return null;
  }
};