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

const CategoryAdd = (): JSX.Element => {
  const { mutateAsync: createCategory, isLoading: isLoadingCreateCategory } = categoriesHooks.useCreateCategory();

  const [categories, setCategories] = useState<Array<any>>([]);
  const onFinish = useCallback(async (values: any) => {
    console.log('Received values of form: ', values);
    
    const data = await createCategory(values);
    // console.log('==== createProduct productDetail', data);
    window.location.href = `/admin/category/${data?.data?.slug}`;
    
  },[createCategory]);

  return <CategoryDetailForm key={'productAdd'} onFinish={onFinish} isLoading={isLoadingCreateCategory} isUpdate={false} />;
};

export default CategoryAdd;
