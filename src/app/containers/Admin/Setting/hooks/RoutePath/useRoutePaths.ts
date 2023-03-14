import { useQuery, UseQueryResult } from 'react-query';

import { RoutePathQueryPayload } from 'models/routePath';
import { settingsApi } from 'app/containers/Admin/Setting';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useRoutePaths = (params: RoutePathQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  return useQuery(
    settingsApi.settingsKeys.list(params),
    async () => {
      const data = await settingsApi.getRoutePaths(params);
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
