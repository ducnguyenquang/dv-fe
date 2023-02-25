import { topMenusHooks } from 'app/containers/Admin/TopMenu';
import { TopMenuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Adding = (): JSX.Element => {
  const { mutateAsync: createTopMenu, isLoading: isLoadingCreateTopMenu } = topMenusHooks.useCreateTopMenu();
  
  const onFinish = useCallback(async (values: any) => {
    await createTopMenu({
      ...values,
    });
  },[createTopMenu]);

  return <TopMenuDetailForm key={'TopMenuAdd'} onFinish={onFinish} isLoading={isLoadingCreateTopMenu} />;
};

export default Adding;
