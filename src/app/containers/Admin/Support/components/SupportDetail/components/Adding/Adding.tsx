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

const Adding = (): JSX.Element => {
  const { mutateAsync: createSupport, isLoading: isLoadingCreateSupport } = supportsHooks.useCreateSupport();

  const [supports, setSupports] = useState<Array<any>>([]);
  const onFinish = useCallback(
    async (values: any) => {
      // console.log('Received values of form: ', values);
      const data = await createSupport(values);
      window.location.href = `/admin/setting/support/${data?.data?._id}`;
    },
    [createSupport]
  );

  return <SupportDetailForm key={'supportAdding'} onFinish={onFinish} isLoading={isLoadingCreateSupport} isUpdate={false} />;
};

export default Adding;
