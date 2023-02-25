import { useMutation, useQueryClient } from 'react-query';

import { CategoryCreatePayload } from 'models/category';
import { categoriesApi } from 'app/containers/Admin/Category';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useCreateCategory = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: CategoryCreatePayload) => {
      return categoriesApi.createCategory(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(categoriesApi.categoriesKeys.lists());
        message.success(intl.formatMessage({ id: 'common.create.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
