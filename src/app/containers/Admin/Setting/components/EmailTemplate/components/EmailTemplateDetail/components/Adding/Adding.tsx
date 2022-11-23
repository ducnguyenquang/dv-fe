import { settingsHooks } from 'app/containers/Admin/Setting';
import { EmailTemplateDetailForm } from '../DetailForm';
import { useCallback } from 'react';


const Adding = (): JSX.Element => {
  const { mutateAsync: createEmailTemplate, isLoading: isLoadingCreateEmailTemplate } = settingsHooks.useCreateEmailTemplate();

  const onFinish = useCallback(async (values: any) => {
    const data = await createEmailTemplate({
      ...values,
      body: encodeURIComponent(values?.body)
    });
    window.location.href = `/admin/setting/emailTemplate/${data?._id}`;
  },[createEmailTemplate]);

  return <EmailTemplateDetailForm key={'EmailTemplateAdd'} onFinish={onFinish} isLoading={isLoadingCreateEmailTemplate} />;
};

export default Adding;
