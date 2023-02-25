import { usersHooks } from 'app/containers/Admin/User';
import { UserDetailForm } from '../UserDetailForm';
import { useCallback } from 'react';

const UserAdd = (): JSX.Element => {
  const { mutateAsync: createUser, isLoading: isLoadingCreateUser } = usersHooks.useCreateUser();

  const onFinish = useCallback(async (values: any) => {
    await createUser(values);
  },[createUser]);

  return <UserDetailForm key={'userAdd'} onFinish={onFinish} isLoading={isLoadingCreateUser} />;
};

export default UserAdd;
