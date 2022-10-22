import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  Image as ImageAntd,
} from 'antd';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { EmailTemplate } from 'models/emailTemplate';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { EmailTemplatesHooks } from '../../../hooks';
// import { EmailTemplatesSelectors } from '../../../redux/selectors';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import endPoint from 'services/api/endPoint.json';
import { settingsActions, settingsHooks, settingsSelectors } from 'app/containers/Admin/Setting';
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
  const { mutateAsync: createEmailTemplate, isLoading: isLoadingCreateEmailTemplate } = settingsHooks.useCreateEmailTemplate();
  // const EmailTemplateDetailParam = useSelector(EmailTemplatesSelectors.getEmailTemplate);

  // const { data: categoriesData, isLoading: isLoadingCategories } = settingsHooks.useCategories({
  //   pagination: {
  //     limit: PAGE_SIZE * 100000,
  //     offset: PAGE - 1,
  //   },
  // });

  const onFinish = useCallback(async (values: any) => {
    const data = await createEmailTemplate(values);
    window.location.href = `/admin/emailTemplate/${data?.data?.id}`;
  },[createEmailTemplate]);

  return <EmailTemplateDetailForm key={'EmailTemplateAdd'} onFinish={onFinish} isLoading={isLoadingCreateEmailTemplate} />;
};

export default Adding;
