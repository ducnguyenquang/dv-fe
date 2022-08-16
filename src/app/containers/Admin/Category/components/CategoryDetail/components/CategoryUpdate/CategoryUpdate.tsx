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
import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { productsHooks } from '../../../hooks';
// import { productsSelectors } from '../../../redux/selectors';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import endPoint from 'services/api/endPoint.json';
import { categoriesActions, categoriesHooks, categoriesSelectors } from 'app/containers/Admin/Category';
import { CategoryDetailForm } from '../CategoryDetailForm';
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

const CategoryUpdate = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateCategory, isLoading: isLoadingUpdateCategory } = categoriesHooks.useUpdateCategory();
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: categoryDetailData, isLoading: isLoadingCategoryDetailData } = categoriesHooks.useCategory({ id });

  const onFinish = useCallback(async (values: any) => {
    await updateCategory({
      ...values,
      _id: categoryDetailData?._id,
    }).then((item: any) => {
      setDefaultValue({
        ...categoryDetailData,
      });
    });
  }, [categoryDetailData, updateCategory])

  useEffect(() => {
    if (categoryDetailData && !isLoadingCategoryDetailData) {
      setDefaultValue({
        ...categoryDetailData,
      });
    }
  }, [categoryDetailData, isLoadingCategoryDetailData]);

  return defaultValue && <CategoryDetailForm key={'productUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingCategoryDetailData || isLoadingUpdateCategory} />
};

export default CategoryUpdate;
