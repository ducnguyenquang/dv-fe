import { TopMenu } from 'models/topMenu';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { topMenusHooks } from 'app/containers/Admin/TopMenu';
import { TopMenuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Updating = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateTopMenu, isLoading: isLoadingUpdateTopMenu } = topMenusHooks.useUpdateTopMenu();
  const [topMenuDetail, setTopMenuDetail] = useState<TopMenu>({});
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: topMenuDetailData, isLoading: isLoadingTopMenuDetail } = topMenusHooks.useTopMenu({ id });

  const onFinish = useCallback(
    async (values: any) => {
      await updateTopMenu({
        ...values,
        _id: topMenuDetailData?._id,
      }).then((item: any) => {
        setTopMenuDetail(item?.data);
        setDefaultValue({
          ...topMenuDetailData,
        });
      });
    },
    [topMenuDetailData, updateTopMenu]
  );

  useEffect(() => {
    if (topMenuDetailData && !isLoadingTopMenuDetail) {
      setTopMenuDetail(topMenuDetailData);
      setDefaultValue({
        ...topMenuDetailData,
      });
    }
  }, [topMenuDetailData, isLoadingTopMenuDetail]);

  return (
    defaultValue && (
      <TopMenuDetailForm
        key={'TopMenuUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingTopMenuDetail || isLoadingUpdateTopMenu}
      />
    )
  );
};

export default Updating;
