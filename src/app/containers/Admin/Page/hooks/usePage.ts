import { useQuery, UseQueryResult } from 'react-query';

import { PageDetailPayload } from 'models/page';
import { pagesApi } from 'app/containers/Admin/Page';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const usePage = (params: PageDetailPayload): UseQueryResult<any> => {
  return useQuery(
    pagesApi.pagesKeys.detail(params),
    async () => {
      const data = await pagesApi.getPage(params);
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
