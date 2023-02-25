import { ProjectQueryPayload, ProjectDetailPayload } from 'models/project';

import { getProjects } from './getProjects';
import { getProject } from './getProject';
import { createProject } from './createProject';
import { updateProject } from './updateProject';
import { deleteProject } from './deleteProject';

export const projectsKeys = {
  all: ['projects'] as const,
  details: () => [...projectsKeys.all, 'detail'] as const,
  detail: (params: ProjectDetailPayload) => [...projectsKeys.details(), { params }] as const,
  lists: () => [...projectsKeys.all, 'list'] as const,
  list: (params: ProjectQueryPayload) => [...projectsKeys.lists(), { params }] as const,
};

export const projectsApi = {
  projectsKeys,
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
};
