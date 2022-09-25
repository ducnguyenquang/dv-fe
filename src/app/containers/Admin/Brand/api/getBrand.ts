// import axios from 'utils/axios';

import { BrandDetailPayload } from "models/brand";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getBrand = async (brand: BrandDetailPayload): Promise<any> => {
  if(brand.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getBrandApi}/${brand.id}`)
    const data = await api.get(brand);
    return data;
  } else {
    return null;
  }
};