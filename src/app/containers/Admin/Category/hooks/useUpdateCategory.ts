import { useMutation, useQueryClient } from 'react-query';

import { CategoryUpdatePayload } from 'models/category';
import { categoriesApi } from 'app/containers/Admin/Category';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateCategory = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: CategoryUpdatePayload) => {
      return categoriesApi.updateCategory(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(categoriesApi.categoriesKeys.lists());
        message.success(intl.formatMessage({ id: 'common.update.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
