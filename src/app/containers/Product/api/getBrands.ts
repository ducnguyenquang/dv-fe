// import axios from 'utils/axios';

import { BrandQueryPayload } from "models/brand";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getBrands = async (brand: BrandQueryPayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.getClientBrandsApi)
  const data = await api.post(brand);
  return data;
};