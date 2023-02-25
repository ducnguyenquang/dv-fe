import { useMutation, useQueryClient } from 'react-query';

import { ProductCreatePayload } from 'models/product';
import { productsApi } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useCreateProduct = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: ProductCreatePayload) => {
      return productsApi.createProduct(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(productsApi.productsKeys.lists());
        message.success(intl.formatMessage({ id: 'common.delete.message.success' }));

      },
      onError: (error: any) => {
        apiErrorHandler(error);
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
