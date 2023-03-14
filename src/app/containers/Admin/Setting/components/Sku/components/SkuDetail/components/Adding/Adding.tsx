import { settingsHooks } from 'app/containers/Admin/Setting';
import { SkuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Adding = (): JSX.Element => {
  const { mutateAsync: createSku, isLoading: isLoadingCreateSku } = settingsHooks.useCreateSku();

  const onFinish = useCallback(async (values: any) => {
    await createSku({
      ...values,
      body: encodeURIComponent(values?.body)
    });
  },[createSku]);

  return <SkuDetailForm key={'SkuAdd'} onFinish={onFinish} isLoading={isLoadingCreateSku} />;
};

export default Adding;
