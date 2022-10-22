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
import { productsActions, productsHooks, productsSelectors } from 'app/containers/Admin/Product';
import { ProductDetailForm } from '../ProductDetailForm';
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

const ProductAdd = (): JSX.Element => {
  const { mutateAsync: createProduct, isLoading: isLoadingCreateProduct } = productsHooks.useCreateProduct();
  // const productDetailParam = useSelector(productsSelectors.getProduct);

  const { data: categoriesData, isLoading: isLoadingCategories } = productsHooks.useCategories({
    pagination: {
      limit: PAGE_SIZE * 100000,
      offset: PAGE - 1,
    },
  });

  const onFinish = useCallback(async (values: any) => {
    const data = await createProduct(values);
    window.location.href = `/admin/products`;
  },[createProduct]);

  return <ProductDetailForm key={'productAdd'} categories={categoriesData?.data} onFinish={onFinish} isLoading={isLoadingCreateProduct || isLoadingCategories} />;
};

export default ProductAdd;
