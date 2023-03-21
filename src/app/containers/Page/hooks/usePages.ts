import { useQuery, UseQueryResult } from 'react-query';

import { PageQueryPayload } from 'models/page';
import { pagesApi } from 'app/containers/Admin/Page';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const usePages = (params: PageQueryPayload): UseQueryResult<any> => {
  return useQuery(
    pagesApi.pagesKeys.list(params),
    async () => {
      const data = await pagesApi.getPages(params);
      return data.data;
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
