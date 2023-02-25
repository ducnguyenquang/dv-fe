// import axios from 'utils/axios';

import { ProjectUpdatePayload } from "models/project";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateProject = async (project: ProjectUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateProjectApi)
  const data = await api.post(project);
  return data;
};