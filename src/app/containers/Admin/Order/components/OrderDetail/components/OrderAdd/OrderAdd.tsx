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



const UserAdd = (): JSX.Element => {
  const { mutateAsync: createUser, isLoading: isLoadingCreateUser } = ordersHooks.useCreateOrder();

  const onFinish = useCallback(async (values: any) => {
    const data = await createUser(values);
    window.location.href = `/admin/order/${data?.data?.orderNumber}`;
  },[createUser]);

  return <OrderDetailForm key={'userAdd'} isLoading={isLoadingCreateUser} />;
};

export default UserAdd;
