import { supportsHooks } from 'app/containers/Admin/Support';
import { SupportDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Adding = (): JSX.Element => {
  const { mutateAsync: createSupport, isLoading: isLoadingCreateSupport } = supportsHooks.useCreateSupport();

  const onFinish = useCallback(
    async (values: any) => {
      await createSupport(values);
    },
    [createSupport]
  );

  return <SupportDetailForm key={'supportAdding'} onFinish={onFinish} isLoading={isLoadingCreateSupport} isUpdate={false} />;
};

export default Adding;
