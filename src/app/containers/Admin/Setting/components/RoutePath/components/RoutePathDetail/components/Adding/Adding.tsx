import { settingsHooks } from 'app/containers/Admin/Setting';
import { RoutePathDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Adding = (): JSX.Element => {
  const { mutateAsync: createRoutePath, isLoading: isLoadingCreateRoutePath } = settingsHooks.useCreateRoutePath();

  const onFinish = useCallback(async (values: any) => {
    await createRoutePath({
      ...values,
      body: encodeURIComponent(values?.body)
    });
  },[createRoutePath]);

  return <RoutePathDetailForm key={'RoutePathAdd'} onFinish={onFinish} isLoading={isLoadingCreateRoutePath} />;
};

export default Adding;
