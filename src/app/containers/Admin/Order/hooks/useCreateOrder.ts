import { useMutation, useQueryClient } from 'react-query';

import { OrderCreatePayload } from 'models/order';
import { ordersApi } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export const useCreateOrder = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: OrderCreatePayload) => {
      return ordersApi.createOrder(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(ordersApi.ordersKeys.lists());
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
