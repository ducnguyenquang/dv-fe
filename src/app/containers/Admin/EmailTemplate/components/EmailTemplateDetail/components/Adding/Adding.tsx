import {
  Select,
} from 'antd';
// import { EmailTemplatesHooks } from '../../../hooks';
// import { EmailTemplatesSelectors } from '../../../redux/selectors';
import { emailTemplatesHooks } from 'app/containers/Admin/EmailTemplate';
import { EmailTemplateDetailForm } from '../DetailForm';
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

const Adding = (): JSX.Element => {
  const { mutateAsync: createEmailTemplate, isLoading: isLoadingCreateEmailTemplate } = emailTemplatesHooks.useCreateEmailTemplate();
  // const EmailTemplateDetailParam = useSelector(EmailTemplatesSelectors.getEmailTemplate);

  // const { data: categoriesData, isLoading: isLoadingCategories } = settingsHooks.useCategories({
  //   pagination: {
  //     limit: PAGE_SIZE * 100000,
  //     offset: PAGE - 1,
  //   },
  // });

  const onFinish = useCallback(async (values: any) => {
    const data = await createEmailTemplate({
      ...values,
      body: encodeURIComponent(values?.body)
    });
    window.location.href = `/admin/setting/emailTemplate/${data?._id}`;
  },[createEmailTemplate]);

  console.log('==== Adding');
  return <EmailTemplateDetailForm key={'EmailTemplateAdd'} onFinish={onFinish} isLoading={isLoadingCreateEmailTemplate} />;
};

export default Adding;
