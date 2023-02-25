import { settingsHooks } from 'app/containers/Admin/Setting';
import { EmailTemplateDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Adding = (): JSX.Element => {
  const { mutateAsync: createEmailTemplate, isLoading: isLoadingCreateEmailTemplate } = settingsHooks.useCreateEmailTemplate();

  const onFinish = useCallback(async (values: any) => {
    await createEmailTemplate({
      ...values,
      body: encodeURIComponent(values?.body)
    });
  },[createEmailTemplate]);

  return <EmailTemplateDetailForm key={'EmailTemplateAdd'} onFinish={onFinish} isLoading={isLoadingCreateEmailTemplate} />;
};

export default Adding;
