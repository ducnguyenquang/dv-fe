import { useQuery, UseQueryResult } from 'react-query';

import { SupportQueryPayload } from 'models/support';
import { supportsApi } from 'app/containers/Admin/Support';
import { templatesApi } from 'app/containers/Template';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useSupports = (params: SupportQueryPayload): UseQueryResult<any> => {
  return useQuery(
    supportsApi.supportsKeys.list(params),
    async () => {
      const data = await templatesApi.getSupports(params);
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
