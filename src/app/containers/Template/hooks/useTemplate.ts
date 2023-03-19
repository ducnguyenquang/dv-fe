import { useQuery, UseQueryResult } from 'react-query';

import { CommonDetailPayload } from 'models/common';
import { templatesApi } from 'app/containers/Template';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useTemplate = (params: CommonDetailPayload): UseQueryResult<any> => {
  return useQuery(
    templatesApi.templateKeys.detail(params),
    async () => {
      const data = await templatesApi.getTemplate(params);
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
