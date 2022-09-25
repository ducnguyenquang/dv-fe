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
import { advertisementsHooks } from 'app/containers/Admin/Advertisement';
import { AdvertisementDetailForm } from '../AdvertisementDetailForm';
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

const AdvertisementUpdate = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateAdvertisement, isLoading: isLoadingUpdateAdvertisement } = advertisementsHooks.useUpdateAdvertisement();
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: advertisementDetailData, isLoading: isLoadingAdvertisementDetailData } = advertisementsHooks.useAdvertisement({ id });

  const onFinish = useCallback(
    async (values: any) => {
      await updateAdvertisement({
        ...values,
        _id: advertisementDetailData?._id,
      }).then((item: any) => {
        setDefaultValue({
          ...advertisementDetailData,
        });
      });
    },
    [advertisementDetailData, updateAdvertisement]
  );

  useEffect(() => {
    if (advertisementDetailData && !isLoadingAdvertisementDetailData) {
      setDefaultValue({
        ...advertisementDetailData,
      });
    }
  }, [advertisementDetailData, isLoadingAdvertisementDetailData]);

  return (
    defaultValue && (
      <AdvertisementDetailForm
        key={'advertisementUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingAdvertisementDetailData || isLoadingUpdateAdvertisement}
      />
    )
  );
};

export default AdvertisementUpdate;
