import { useQuery, UseQueryResult } from 'react-query';
import { OrderQueryPayload } from 'models/order';
import { ordersApi } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useOrders = (params: OrderQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  return useQuery(
    ordersApi.ordersKeys.list(params),
    async () => {
      const data = await ordersApi.getOrders(params);
      return data.data;
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
