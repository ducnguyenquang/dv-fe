import { useQuery, UseQueryResult } from 'react-query';
import { SupportDetailPayload } from 'models/support';
import { supportsApi } from 'app/containers/Admin/Support';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useSupport = (params: SupportDetailPayload): UseQueryResult<any> => {

  return useQuery(
    supportsApi.supportsKeys.detail(params),
    async () => {
      const data = await supportsApi.getSupport(params);
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
