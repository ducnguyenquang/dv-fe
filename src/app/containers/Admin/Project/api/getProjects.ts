// import axios from 'utils/axios';

import { ProjectQueryPayload } from "models/project";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getProjects = async (project: ProjectQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getProjectsApi)
  const { data } = await api.post(project);
  return data;
};