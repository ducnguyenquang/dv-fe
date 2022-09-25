import { Select } from 'antd';
// import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
// import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { productsHooks } from '../../../hooks';
// import { productsSelectors } from '../../../redux/selectors';
// import { UploadOutlined } from '@ant-design/icons';
// import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import ImgCrop from 'antd-img-crop';
// import endPoint from 'services/api/endPoint.json';
import { brandsHooks } from 'app/containers/Admin/Brand';
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

const BrandUpdate = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateBrand, isLoading: isLoadingUpdateBrand } = brandsHooks.useUpdateBrand();
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: brandDetailData, isLoading: isLoadingBrandDetailData } = brandsHooks.useBrand({ id });

  const onFinish = useCallback(
    async (values: any) => {
      await updateBrand({
        ...values,
        _id: brandDetailData?._id,
      }).then((item: any) => {
        setDefaultValue({
          ...brandDetailData,
        });
      });
    },
    [brandDetailData, updateBrand]
  );

  useEffect(() => {
    if (brandDetailData && !isLoadingBrandDetailData) {
      setDefaultValue({
        ...brandDetailData,
      });
    }
  }, [brandDetailData, isLoadingBrandDetailData]);

  return (
    defaultValue && (
      <BrandDetailForm
        key={'brandUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingBrandDetailData || isLoadingUpdateBrand}
      />
    )
  );
};

export default BrandUpdate;
