import { useQuery, UseQueryResult } from 'react-query';

import { CategoryQueryPayload } from 'models/category';
import { categoriesApi } from 'app/containers/Admin/Category';
import { templatesApi } from 'app/containers/Template';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useCategories = (params: CategoryQueryPayload): UseQueryResult<any> => {
  return useQuery(
    categoriesApi.categoriesKeys.list(params),
    async () => {
      const data = await templatesApi.getCategories(params);
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
