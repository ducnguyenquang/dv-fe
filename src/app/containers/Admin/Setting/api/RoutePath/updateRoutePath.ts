// import axios from 'utils/axios';

import { RoutePathUpdatePayload } from "models/routePath";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateRoutePath = async (routePath: RoutePathUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateRoutePathApi)
  const data = await api.post(routePath);
  return data;
};