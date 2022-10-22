import {
  Select,
} from 'antd';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { EmailTemplate } from 'models/emailTemplate';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { EmailTemplatesHooks } from '../../../hooks';
// import { EmailTemplatesSelectors } from '../../../redux/selectors';
import type { UploadFile } from 'antd/es/upload/interface';
import { settingsHooks } from 'app/containers/Admin/Setting';
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

const Updating = (): JSX.Element => {
  // const [form] = Form.useForm();
  const { id } = useParams();
  // const isUpdate = id ? true : false;
  const { mutateAsync: updateEmailTemplate, isLoading: isLoadingUpdateEmailTemplate } = settingsHooks.useUpdateEmailTemplate();

  const [emailTemplateDetail, setEmailTemplateDetail] = useState<EmailTemplate>({});
  const [defaultValue, setDefaultValue] = useState<any>();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  // const EmailTemplateDetailParam = useSelector(EmailTemplatesSelectors.getEmailTemplate);

  // const { data: categoriesData, isLoading: isLoadingCategories } = EmailTemplatesHooks.useCategories({
  //   pagination: {
  //     limit: pageSize,
  //     offset: page > 1 ? page - 1 : page,
  //   },
  // });
  // EmailTemplatesSelectors.getEmailTemplate()
  const { data: emailTemplateDetailData, isLoading: isLoadingEmailTemplateDetail } = settingsHooks.useEmailTemplate({ id });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updateEmailTemplate({
      ...values,
      _id: emailTemplateDetailData?._id,
      // images: fileList,
      categories: values.categories.map((item: any) => item.value),
    }).then((item: any) => {
      setEmailTemplateDetail(item?.data);
      setFileList(item?.data?.images);
      setDefaultValue({
        ...emailTemplateDetailData,
        subject: decodeURIComponent(emailTemplateDetailData?.description),
        body: decodeURIComponent(emailTemplateDetailData?.specification),
      });
    });
  }, [emailTemplateDetailData, updateEmailTemplate])

  useEffect(() => {
    if (emailTemplateDetailData && !isLoadingEmailTemplateDetail) {
      // console.log('==== emailTemplateDetailData', emailTemplateDetailData)
      setEmailTemplateDetail(emailTemplateDetailData);
      setFileList(emailTemplateDetailData?.images);
      setDefaultValue({
        ...emailTemplateDetailData,
        subject: decodeURIComponent(emailTemplateDetailData?.description),
        body: decodeURIComponent(emailTemplateDetailData?.specification),
      });
    }
  }, [emailTemplateDetailData, isLoadingEmailTemplateDetail]);

  return defaultValue && <EmailTemplateDetailForm key={'EmailTemplateUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingEmailTemplateDetail || isLoadingUpdateEmailTemplate} />
};

export default Updating;
