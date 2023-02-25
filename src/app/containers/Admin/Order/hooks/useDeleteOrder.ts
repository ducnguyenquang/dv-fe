import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import { OrderDeletePayload } from 'models/order';
import { ordersApi } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { useIntl } from 'react-intl';

export const useDeleteOrder = (): any => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (params: OrderDeletePayload) => {
      return ordersApi.deleteOrder(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ordersApi.ordersKeys.lists());
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
