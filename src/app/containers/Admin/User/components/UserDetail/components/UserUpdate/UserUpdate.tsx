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
import { usersHooks } from 'app/containers/Admin/User';
import { UserDetailForm } from '../UserDetailForm';
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

const UserUpdate = (): JSX.Element => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const isUpdate = id ? true : false;

  const { mutateAsync: updateUser, isLoading: isLoadingUpdateUser } = usersHooks.useUpdateUser();
  const [userDetail, setUserDetail] = useState<User>({});
  const [defaultValue, setDefaultValue] = useState<any>();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data: userDetailData, isLoading: isLoadingUserDetail } = usersHooks.useUser({ id });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updateUser({
      ...values,
      _id: userDetailData?._id,
      // images: fileList,
    }).then((item: any) => {
      setUserDetail(item?.data);
      setFileList(item?.data?.images);
      setDefaultValue({
        ...userDetailData,
      });
    });
  }, [updateUser, userDetailData, fileList]);

  useEffect(() => {
    if (userDetailData && !isLoadingUserDetail) {
      setUserDetail(userDetailData);
      setFileList(userDetailData?.images);
      setDefaultValue({
        ...userDetailData,
      });
    }
  }, [userDetailData, isLoadingUserDetail]);

  return defaultValue && <UserDetailForm key={'productUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingUserDetail || isLoadingUpdateUser} />
};

export default UserUpdate;
