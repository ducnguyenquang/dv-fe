// import axios from 'utils/axios';

import { BrandCreatePayload } from "models/brand";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createBrand = async (brand: BrandCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createBrandApi)
  const data = await api.post(brand);
  return data;
};