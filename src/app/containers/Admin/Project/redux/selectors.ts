import type { RootState } from 'config/configureStore';
import { TPagination } from 'models/pagination';

const getProjectsPagination = (state: RootState): TPagination => state.adminProjects.pagination;
const getProjects = (state: RootState): TPagination => state.adminProjects.projects;
const getProject = (state: RootState) => state.adminProjects.projectDetail;
const getIsLoading = (state: RootState): Boolean => state.adminProjects.isLoading;

export const projectsSelectors = {
  getProjectsPagination,
  getProjects,
  getIsLoading,
  getProject,
};
