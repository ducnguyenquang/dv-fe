// import axios from 'utils/axios';

import { RoutePathDetailPayload } from "models/routePath";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getRoutePath = async (routePath: RoutePathDetailPayload): Promise<any> => {
  if(routePath.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getRoutePathApi}/${routePath.id}`)
    const data = await api.get(routePath);
    return data;
  } else {
    return null;
  }
};