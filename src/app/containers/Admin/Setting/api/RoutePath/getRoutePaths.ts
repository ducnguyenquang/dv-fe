// import axios from 'utils/axios';

import { RoutePathQueryPayload } from "models/routePath";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getRoutePaths = async (routePath: RoutePathQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getRoutePathsApi)
  const { data } = await api.post(routePath);
  return data;
};