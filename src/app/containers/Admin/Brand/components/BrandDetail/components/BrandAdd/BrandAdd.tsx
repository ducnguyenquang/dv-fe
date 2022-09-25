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
// import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
// import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// // import { productsHooks } from '../../../hooks';
// // import { productsSelectors } from '../../../redux/selectors';
// import { UploadOutlined } from '@ant-design/icons';
// import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import ImgCrop from 'antd-img-crop';
// import endPoint from 'services/api/endPoint.json';
import { brandsActions, brandsHooks, brandsSelectors } from 'app/containers/Admin/Brand';
import { BrandDetailForm } from '../BrandDetailForm';
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
const detailFormItemLayout = {
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

const BrandAdd = (): JSX.Element => {
  const { mutateAsync: createBrand, isLoading: isLoadingCreateBrand } = brandsHooks.useCreateBrand();

  const [brands, setBrands] = useState<Array<any>>([]);
  const onFinish = useCallback(
    async (values: any) => {
      // console.log('Received values of form: ', values);
      const data = await createBrand(values);
      window.location.href = `/admin/brand/${data?.data?.slug}`;
    },
    [createBrand]
  );

  return <BrandDetailForm key={'brandAdd'} onFinish={onFinish} isLoading={isLoadingCreateBrand} isUpdate={false} />;
};

export default BrandAdd;
