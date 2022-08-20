import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { OrderQueryPayload, Order } from 'models/order';
import { ordersApi, ordersActions } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
import { message } from 'antd';

export const useOrders = (params: OrderQueryPayload): UseQueryResult<{ data: any, pagination: any }> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    ordersApi.ordersKeys.list(params),
    async () => {
      const data = await ordersApi.getOrders(params);
      console.log('==== useOrders data', data)
      // storeEquipmentPaginationModals(data?.page);

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
