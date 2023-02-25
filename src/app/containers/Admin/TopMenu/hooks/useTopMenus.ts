import { useQuery, UseQueryResult } from 'react-query';

import { TopMenuQueryPayload } from 'models/topMenu';
import { topMenusApi } from 'app/containers/Admin/TopMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useTopMenus = (params: TopMenuQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  return useQuery(
    topMenusApi.topMenusKeys.list(params),
    async () => {
      const data = await topMenusApi.getTopMenus(params);
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
