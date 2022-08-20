import {
  Form,
  Select,
} from 'antd';
import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
import { User } from 'models/user';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { productsHooks } from '../../../hooks';
// import { productsSelectors } from '../../../redux/selectors';
import type { UploadFile } from 'antd/es/upload/interface';
import { ordersHooks } from 'app/containers/Admin/Order';
import { OrderDetailForm } from '../OrderDetailForm';
import { useCallback } from 'react';

// interface IProps {
//   caterogy?: string;
//   id?: string;
// }

const UserUpdate = (): JSX.Element => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const isUpdate = id ? true : false;

  const { mutateAsync: updateOrder, isLoading: isLoadingUpdateOrder } = ordersHooks.useUpdateOrder();
  const [userDetail, setUserDetail] = useState<User>({});
  const [defaultValue, setDefaultValue] = useState<any>();

  // const [page, setPage] = React.useState(PAGE);
  // const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data: orderDetailData, isLoading: isLoadingOrderDetail } = ordersHooks.useOrder({ id });
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updateOrder({
      ...values,
      _id: orderDetailData?._id,
      // images: fileList,
    }).then((item: any) => {
      setUserDetail(item?.data);
      // setFileList(item?.data?.images);
      setDefaultValue({
        ...orderDetailData,
      });
    });
  }, [updateOrder, orderDetailData]);

  useEffect(() => {
    if (orderDetailData && !isLoadingOrderDetail) {
      setUserDetail(orderDetailData);
      setDefaultValue({
        ...orderDetailData,
      });
    }
  }, [orderDetailData, isLoadingOrderDetail]);

  return defaultValue && <OrderDetailForm key={'productUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingOrderDetail || isLoadingUpdateOrder} />
};

export default UserUpdate;
