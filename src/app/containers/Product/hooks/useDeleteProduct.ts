import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { ProductDeletePayload } from 'models/product';
import { productsApi } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteProduct = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: ProductDeletePayload) => {
      return productsApi.deleteProduct(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(productsApi.productsKeys.lists());
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
