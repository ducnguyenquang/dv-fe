import { EmailTemplate } from 'models/emailTemplate';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { settingsHooks } from 'app/containers/Admin/Setting';
import { EmailTemplateDetailForm } from '../DetailForm';
import { useCallback } from 'react';


const Updating = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateEmailTemplate, isLoading: isLoadingUpdateEmailTemplate } = settingsHooks.useUpdateEmailTemplate();

  const [emailTemplateDetail, setEmailTemplateDetail] = useState<EmailTemplate>({});
  const [defaultValue, setDefaultValue] = useState<any>();

  const { data: emailTemplateDetailData, isLoading: isLoadingEmailTemplateDetail } = settingsHooks.useEmailTemplate({ id });

  const onFinish = useCallback(async (values: any) => {
    await updateEmailTemplate({
      ...values,
      _id: emailTemplateDetailData?._id,
    }).then((item: any) => {
      setEmailTemplateDetail(item?.data);
      setDefaultValue({
        ...emailTemplateDetailData,
        body: decodeURIComponent(emailTemplateDetailData?.body),
      });
    });
  }, [emailTemplateDetailData, updateEmailTemplate])

  useEffect(() => {
    if (emailTemplateDetailData && !isLoadingEmailTemplateDetail) {
      setEmailTemplateDetail(emailTemplateDetailData);
      setDefaultValue({
        ...emailTemplateDetailData,
        body: decodeURIComponent(emailTemplateDetailData?.body),
      });
    }
  }, [emailTemplateDetailData, isLoadingEmailTemplateDetail]);

  return defaultValue && <EmailTemplateDetailForm key={'EmailTemplateUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingEmailTemplateDetail || isLoadingUpdateEmailTemplate} />
};

export default Updating;
