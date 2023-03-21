import { useQuery, UseQueryResult } from 'react-query';

import { TopMenuDetailPayload } from 'models/topMenu';
import { topMenusApi } from 'app/containers/Admin/TopMenu';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useTopMenu = (params: TopMenuDetailPayload): UseQueryResult<any> => {
  return useQuery(
    topMenusApi.topMenusKeys.detail(params),
    async () => {
      const data = await topMenusApi.getTopMenu(params);
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
