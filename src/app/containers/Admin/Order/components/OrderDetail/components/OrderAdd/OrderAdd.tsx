import {
  Select,
} from 'antd';
// import { productsHooks } from '../../../hooks';
// import { productsSelectors } from '../../../redux/selectors';
import { ordersHooks } from 'app/containers/Admin/Order';
import { OrderDetailForm } from '../OrderDetailForm';
import { useCallback } from 'react';

// interface IProps {
//   caterogy?: string;
//   id?: string;
// }



const OrderAdd = (): JSX.Element => {
  const { mutateAsync: createOrder, isLoading: isLoadingCreateOrder } = ordersHooks.useCreateOrder();

  const onFinish = useCallback(async (values: any) => {
    const data = await createOrder(values);
    window.location.href = `/admin/order/${data?.data?.orderNumber}`;
  },[createOrder]);

  return <OrderDetailForm key={'orderAdd'} isLoading={isLoadingCreateOrder} onFinish={onFinish} />;
};

export default OrderAdd;
