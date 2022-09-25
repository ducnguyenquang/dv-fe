import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { OrderDetailPayload, Order } from 'models/order';
import { ordersApi, ordersActions } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';

export const useOrder = (params: OrderDetailPayload): UseQueryResult<any> => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useQuery(
    ordersApi.ordersKeys.detail(params),
    async () => {
      // console.log('==== useOrder params', params)
      const data = await ordersApi.getOrder(params);
      // storeEquipmentPaginationModals(data?.page);
      // console.log('==== useOrder data', data)

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
