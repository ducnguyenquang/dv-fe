import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { OrderQueryPayload, Order, OrderCreatePayload } from 'models/order';
import { ordersApi, ordersActions } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
// import { successMessage } from 'common/components/Toast';
import { message } from 'antd';

export const useCreateOrder = (): any => {
  // const dispatch = useDispatch();

  // const storeEquipmentPaginationModals = useCallback(
  //   pagination => {
  //     dispatch(productsApi.setEquipmentPagination(pagination));
  //   },
  //   [dispatch]
  // );
  // console.log('==== useProducts params', params)

  return useMutation(
    (params: OrderCreatePayload) => {
      return ordersApi.createOrder(params);
    },
    {
      onSuccess: (data) => {
        // Reset list of equipments
        // queryClient.invalidateQueries(equipmentsApi.equipmentsKeys.lists());
        // console.log('==== createUser onSuccess data', data)
        message.success('This is a success message');
        return data;
        // successMessage({ value: 'Update Successfully' });
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
