import {
  Select,
} from 'antd';
// import { productsHooks } from '../../../hooks';
// import { productsSelectors } from '../../../redux/selectors';
import { usersHooks } from 'app/containers/Admin/User';
import { UserDetailForm } from '../UserDetailForm';
import { useCallback } from 'react';

// interface IProps {
//   caterogy?: string;
//   id?: string;
// }

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UserAdd = (): JSX.Element => {
  const { mutateAsync: createUser, isLoading: isLoadingCreateUser } = usersHooks.useCreateUser();

  const onFinish = useCallback(async (values: any) => {
    const data = await createUser(values);
    window.location.href = `/admin/user/${data?.data?._id}`;
  },[createUser]);

  return <UserDetailForm key={'userAdd'} onFinish={onFinish} isLoading={isLoadingCreateUser} />;
};

export default UserAdd;
