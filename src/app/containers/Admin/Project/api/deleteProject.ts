// import axios from 'utils/axios';

import { ProjectDetailPayload } from "models/project";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteProject = async (project: ProjectDetailPayload): Promise<any> => {
  // console.log('==== deleteProject project', project)
  if(project) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getProjectApi}/remove/${project}`)
    const data = await api.get(project);
    return data;
  } else {
    return null;
  }
};