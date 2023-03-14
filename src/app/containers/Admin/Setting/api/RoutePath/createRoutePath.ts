// import axios from 'utils/axios';

import { RoutePathCreatePayload } from "models/routePath";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createRoutePath = async (routePath: RoutePathCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createRoutePathApi)
  const data = await api.post(routePath);
  return data;
};