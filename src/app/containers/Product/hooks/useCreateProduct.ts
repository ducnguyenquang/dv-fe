import { useMutation, useQueryClient } from 'react-query';
import { ProductCreatePayload } from 'models/product';
import { productsApi } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
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
