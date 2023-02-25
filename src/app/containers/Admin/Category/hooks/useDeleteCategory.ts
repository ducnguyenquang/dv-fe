import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { CategoryDeletePayload } from 'models/category';
import { categoriesApi } from 'app/containers/Admin/Category';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteCategory = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: CategoryDeletePayload) => {
      return categoriesApi.deleteCategory(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(categoriesApi.categoriesKeys.lists());
        message.success(intl.formatMessage({ id: 'common.delete.message.success' }));
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
          

        }
      },
    }
  );
};
