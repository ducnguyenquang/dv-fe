import {
  Form,
  Select,
} from 'antd';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { User } from 'models/user';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { UploadFile } from 'antd/es/upload/interface';
import { usersHooks } from 'app/containers/Admin/User';
import { UserDetailForm } from '../UserDetailForm';
import { useCallback } from 'react';

const UserUpdate = (): JSX.Element => {
  const { id } = useParams();

  const { mutateAsync: updateUser, isLoading: isLoadingUpdateUser } = usersHooks.useUpdateUser();
  const [userDetail, setUserDetail] = useState<User>({});
  const [defaultValue, setDefaultValue] = useState<any>();
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
  }, [updateUser, userDetailData]);

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
