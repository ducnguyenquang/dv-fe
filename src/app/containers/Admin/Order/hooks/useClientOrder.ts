import { useQuery, UseQueryResult } from 'react-query';
import { OrderDetailPayload } from 'models/order';
import { ordersApi } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useClientOrder = (params: OrderDetailPayload): UseQueryResult<any> => {
  return useQuery(
    ordersApi.ordersKeys.detail(params),
    async () => {
      const data = await ordersApi.getClientOrder(params);
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
