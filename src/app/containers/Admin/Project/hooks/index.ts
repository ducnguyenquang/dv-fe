import { useProjects } from './useProjects';
import { useProject } from './useProject';
import { useCreateProject } from './useCreateProject';
import { useUpdateProject } from './useUpdateProject';
import { useDeleteProject } from './useDeleteProject';


export const projectsHooks = {
  useProjects,
  useCreateProject,
  useProject,
  useUpdateProject,
  useDeleteProject,
};
