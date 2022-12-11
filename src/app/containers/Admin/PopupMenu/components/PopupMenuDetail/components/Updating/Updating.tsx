import { PopupMenu } from 'models/popupMenu';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { popupMenusHooks } from 'app/containers/Admin/PopupMenu';
import { PopupMenuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Updating = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updatePopupMenu, isLoading: isLoadingUpdatePopupMenu } = popupMenusHooks.useUpdatePopupMenu();
  const [popupMenuDetail, setPopupMenuDetail] = useState<PopupMenu>({});
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: popupMenuDetailData, isLoading: isLoadingPopupMenuDetail } = popupMenusHooks.usePopupMenu({ id });

  const onFinish = useCallback(
    async (values: any) => {
      await updatePopupMenu({
        ...values,
        _id: popupMenuDetailData?._id,
      }).then((item: any) => {
        setPopupMenuDetail(item?.data);
        setDefaultValue({
          ...popupMenuDetailData,
        });
      });
    },
    [popupMenuDetailData, updatePopupMenu]
  );

  useEffect(() => {
    if (popupMenuDetailData && !isLoadingPopupMenuDetail) {
      setPopupMenuDetail(popupMenuDetailData);
      setDefaultValue({
        ...popupMenuDetailData,
      });
    }
  }, [popupMenuDetailData, isLoadingPopupMenuDetail]);

  return (
    defaultValue && (
      <PopupMenuDetailForm
        key={'PopupMenuUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingPopupMenuDetail || isLoadingUpdatePopupMenu}
      />
    )
  );
};

export default Updating;
