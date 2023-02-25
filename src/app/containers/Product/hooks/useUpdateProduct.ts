import { useMutation, useQueryClient } from 'react-query';

import { ProductUpdatePayload } from 'models/product';
import { productsApi } from 'app/containers/Admin/Product';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useUpdateProduct = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: ProductUpdatePayload) => {
      return productsApi.updateProduct(params);
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
