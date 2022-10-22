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
import { supportsHooks } from 'app/containers/Admin/Support';
import { SupportDetailForm } from '../DetailForm';
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
  const { id } = useParams();
  const { mutateAsync: updateSupport, isLoading: isLoadingUpdateSupport } = supportsHooks.useUpdateSupport();
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: SupportDetailData, isLoading: isLoadingSupportDetailData } = supportsHooks.useSupport({ id });

  const onFinish = useCallback(
    async (values: any) => {
      await updateSupport({
        ...values,
        _id: SupportDetailData?._id,
      }).then((item: any) => {
        setDefaultValue({
          ...SupportDetailData,
        });
      });
    },
    [SupportDetailData, updateSupport]
  );

  useEffect(() => {
    if (SupportDetailData && !isLoadingSupportDetailData) {
      setDefaultValue({
        ...SupportDetailData,
      });
    }
  }, [SupportDetailData, isLoadingSupportDetailData]);

  return (
    defaultValue && (
      <SupportDetailForm
        key={'supportUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingSupportDetailData || isLoadingUpdateSupport}
      />
    )
  );
};

export default Updating;
