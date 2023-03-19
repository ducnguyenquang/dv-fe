import { useQuery, UseQueryResult } from 'react-query';

import { CategoryDetailPayload } from 'models/category';
import { categoriesApi } from 'app/containers/Admin/Category';
import { templatesApi } from 'app/containers/Template';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useCategory = (params: CategoryDetailPayload): UseQueryResult<any> => {
  return useQuery(
    categoriesApi.categoriesKeys.detail(params),
    async () => {
      const data = await templatesApi.getCategory(params);
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
