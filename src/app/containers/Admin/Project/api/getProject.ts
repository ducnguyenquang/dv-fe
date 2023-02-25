// import axios from 'utils/axios';

import { ProjectDetailPayload } from "models/project";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getProject = async (project: ProjectDetailPayload): Promise<any> => {
  if(project.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getProjectApi}/${project.id}`)
    const data = await api.get(project);
    return data;
  } else {
    return null;
  }
};