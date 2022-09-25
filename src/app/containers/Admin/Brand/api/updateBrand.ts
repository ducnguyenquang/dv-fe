// import axios from 'utils/axios';

import { BrandUpdatePayload } from "models/brand";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateBrand = async (brand: BrandUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateBrandApi)
  const data = await api.post(brand);
  return data;
};