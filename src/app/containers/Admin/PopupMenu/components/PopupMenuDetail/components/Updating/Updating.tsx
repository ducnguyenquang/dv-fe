// import {
//   Select,
// } from 'antd';
// import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
import { PopupMenu } from 'models/popupMenu';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { EmailTemplatesHooks } from '../../../hooks';
// import { EmailTemplatesSelectors } from '../../../redux/selectors';
// import type { UploadFile } from 'antd/es/upload/interface';
import { popupMenusHooks } from 'app/containers/Admin/PopupMenu';
import { PopupMenuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

// interface IProps {
//   caterogy?: string;
//   id?: string;
// }

// const { Option } = Select;
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

const Updating = (): JSX.Element => {
  // const [form] = Form.useForm();
  const { id } = useParams();
  // const isUpdate = id ? true : false;
  const { mutateAsync: updatePopupMenu, isLoading: isLoadingUpdatePopupMenu } = popupMenusHooks.useUpdatePopupMenu();

  const [popupMenuDetail, setPopupMenuDetail] = useState<PopupMenu>({});
  const [defaultValue, setDefaultValue] = useState<any>();

  const { data: popupMenuDetailData, isLoading: isLoadingPopupMenuDetail } = popupMenusHooks.usePopupMenu({ id });
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updatePopupMenu({
      ...values,
      _id: popupMenuDetailData?._id,
      // images: fileList,
      // categories: values.categories.map((item: any) => item.value),
    }).then((item: any) => {
      setPopupMenuDetail(item?.data);
      // setFileList(item?.data?.images);
      setDefaultValue({
        ...popupMenuDetailData,
        // subject: decodeURIComponent(popupMenuDetailData?.description),
        // body: decodeURIComponent(popupMenuDetailData?.body),
      });
    });
  }, [popupMenuDetailData, updatePopupMenu])

  useEffect(() => {
    if (popupMenuDetailData && !isLoadingPopupMenuDetail) {
      // console.log('==== popupMenuDetailData', popupMenuDetailData)
      setPopupMenuDetail(popupMenuDetailData);
      // setFileList(popupMenuDetailData?.images);
      setDefaultValue({
        ...popupMenuDetailData,
        // subject: decodeURIComponent(popupMenuDetailData?.description),
        // body: decodeURIComponent(popupMenuDetailData?.body),
      });
    }
  }, [popupMenuDetailData, isLoadingPopupMenuDetail]);

  return defaultValue && <PopupMenuDetailForm key={'PopupMenuUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingPopupMenuDetail || isLoadingUpdatePopupMenu} />
};

export default Updating;
