import { useMutation } from 'react-query';

import { OrderCreatePayload } from 'models/order';
import { ordersApi } from 'app/containers/Admin/Order';
import { apiErrorHandler } from 'utils';
import { ErrorResponse } from 'models/error';
// import { successMessage } from 'common/components/Toast';
import { message } from 'antd';
import ToastMessage from 'app/containers/Template/components/AdminTemplate/components/ToastMessage/ToastMessage';
import { error } from 'console';

export const useCreateOrder = (): any => {
  return useMutation(
    (params: OrderCreatePayload) => {
      return ordersApi.createOrder(params);
    },
    {
      onSuccess: (data) => {
        // message.success('This is a success message');
        // ToastMessage({type:'error', content: 'Đặt hàng thành công'})
        // return data;
      },
      onError: (error: ErrorResponse) => {
        if (error?.response?.errors?.length) {
          apiErrorHandler(error?.response?.errors);
        }
      },
    }
  );
};
