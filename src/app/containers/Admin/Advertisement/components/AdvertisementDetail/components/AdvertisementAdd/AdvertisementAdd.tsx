import {
  Select,
} from 'antd';
// import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
// import { Product } from 'models/product';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// // import { productsHooks } from '../../../hooks';
// // import { productsSelectors } from '../../../redux/selectors';
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

const AdvertisementAdd = (): JSX.Element => {
  const { mutateAsync: createAdvertisement, isLoading: isLoadingCreateBrand } = advertisementsHooks.useCreateAdvertisement();

  const [advertisements, setAdvertisements] = useState<Array<any>>([]);
  const onFinish = useCallback(
    async (values: any) => {
      // console.log('Received values of form: ', values);
      const data = await createAdvertisement(values);
      window.location.href = `/admin/advertisement/${data?.data?.slug}`;
    },
    [createAdvertisement]
  );

  return <AdvertisementDetailForm key={'advertisementAdd'} onFinish={onFinish} isLoading={isLoadingCreateBrand} isUpdate={false} />;
};

export default AdvertisementAdd;
