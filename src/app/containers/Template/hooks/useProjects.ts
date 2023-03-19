import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProjectQueryPayload } from 'models/project';
import { projectsApi, projectsActions } from 'app/containers/Admin/Project';
import { templatesApi } from 'app/containers/Template';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useProjects = (params: ProjectQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  const dispatch = useDispatch();
  
  const storeProjectPaginationModals = useCallback(
    ({data, pagination}: {data: any, pagination: any}) => {
      dispatch(projectsActions.setProjects({data, pagination}));
    },
    [dispatch]
  );

  return useQuery(
    projectsApi.projectsKeys.list(params),
    async () => {
      const data = await templatesApi.getProjects(params);
      storeProjectPaginationModals(data);
      return data;
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
