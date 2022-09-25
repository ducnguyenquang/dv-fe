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

const ProductUpdate = (): JSX.Element => {
  // const [form] = Form.useForm();
  const { id } = useParams();
  // const isUpdate = id ? true : false;
  const { mutateAsync: updateProduct, isLoading: isLoadingUpdateProduct } = productsHooks.useUpdateProduct();

  const [productDetail, setProductDetail] = useState<Product>({});
  const [defaultValue, setDefaultValue] = useState<any>();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  // const productDetailParam = useSelector(productsSelectors.getProduct);

  const { data: categoriesData, isLoading: isLoadingCategories } = productsHooks.useCategories({
    pagination: {
      limit: pageSize,
      offset: page > 1 ? page - 1 : page,
    },
  });
  // productsSelectors.getProduct()
  const { data: productDetailData, isLoading: isLoadingProductDetail } = productsHooks.useProduct({ id });
  console.log('==== categoriesData', categoriesData);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updateProduct({
      ...values,
      _id: productDetailData?._id,
      // images: fileList,
      categories: values.categories.map((item: any) => item.value),
    }).then((item: any) => {
      setProductDetail(item?.data);
      setFileList(item?.data?.images);
      setDefaultValue({
        ...productDetailData,
        categories: productDetailData?.categories?.map((item: Category) => {
          // categories.filter()
          return { value: item._id, label: item.name };

        }),
      });
    });
  }, [productDetailData, updateProduct])

  useEffect(() => {
    if (productDetailData && !isLoadingProductDetail) {
      // console.log('==== productDetailData', productDetailData)
      setProductDetail(productDetailData);
      setFileList(productDetailData?.images);
      setDefaultValue({
        ...productDetailData,
        categories: productDetailData?.categories.map((item: Category) => {
          // console.log('==== includes', productDetailData?.categories?.map((category: Category) => category._id)?.includes(item._id))
          return { value: item._id, label: item.name };
        }),
      });
    }
  }, [productDetailData, isLoadingProductDetail, categoriesData]);

  return defaultValue && <ProductDetailForm key={'productUpdate'} isUpdate={true} categories={categoriesData?.data} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingProductDetail || isLoadingUpdateProduct} />
};

export default ProductUpdate;
