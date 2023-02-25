// import axios from 'utils/axios';

import { ProjectCreatePayload } from "models/project";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createProject = async (project: ProjectCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createProjectApi)
  const data = await api.post(project);
  return data;
};