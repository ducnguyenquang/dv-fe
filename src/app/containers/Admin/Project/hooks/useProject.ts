import { useQuery, UseQueryResult } from 'react-query';

import { ProjectDetailPayload } from 'models/project';
import { projectsApi } from 'app/containers/Admin/Project';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useProject = (params: ProjectDetailPayload): UseQueryResult<any> => {
  return useQuery(
    projectsApi.projectsKeys.detail(params),
    async () => {
      const data = await projectsApi.getProject(params);
      return data?.data;
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
