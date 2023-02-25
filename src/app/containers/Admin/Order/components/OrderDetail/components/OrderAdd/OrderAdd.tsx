import { ordersHooks } from 'app/containers/Admin/Order';
import { OrderDetailForm } from '../OrderDetailForm';
import { useCallback } from 'react';

const OrderAdd = (): JSX.Element => {
  const { mutateAsync: createOrder, isLoading: isLoadingCreateOrder } = ordersHooks.useCreateOrder();

  const onFinish = useCallback(async (values: any) => {
    await createOrder(values);
  },[createOrder]);

  return <OrderDetailForm key={'orderAdd'} isLoading={isLoadingCreateOrder} onFinish={onFinish} />;
};

export default OrderAdd;
