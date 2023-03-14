// import axios from 'utils/axios';

import { RoutePathDetailPayload } from "models/routePath";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteRoutePath = async (routePath: RoutePathDetailPayload): Promise<any> => {
  if(routePath) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeRoutePathApi}/${routePath._id}`)
    const data = await api.get(routePath);
    return data;
  } else {
    return null;
  }
};