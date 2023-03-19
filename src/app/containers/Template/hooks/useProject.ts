import { useQuery, UseQueryResult } from 'react-query';

import { ProjectDetailPayload } from 'models/project';
import { projectsApi } from 'app/containers/Admin/Project';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { templatesApi } from 'app/containers/Template';

export const useProject = (params: ProjectDetailPayload): UseQueryResult<any> => {
  return useQuery(
    projectsApi.projectsKeys.detail(params),
    async () => {
      const data = await templatesApi.getProject(params);
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
