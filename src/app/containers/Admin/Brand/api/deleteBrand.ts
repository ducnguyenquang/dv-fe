// import axios from 'utils/axios';

import { BrandDetailPayload } from "models/brand";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteBrand = async (brand: BrandDetailPayload): Promise<any> => {
  if (brand) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getBrandApi}/remove/${brand}`)
    const data = await api.get(brand);
    return data;
  } else {
    return null;
  }
};