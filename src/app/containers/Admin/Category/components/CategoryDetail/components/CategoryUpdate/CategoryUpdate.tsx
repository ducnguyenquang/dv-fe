import { Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoriesHooks } from 'app/containers/Admin/Category';
import { CategoryDetailForm } from '../CategoryDetailForm';
import { useCallback } from 'react';

const CategoryUpdate = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateCategory, isLoading: isLoadingUpdateCategory } = categoriesHooks.useUpdateCategory();
  const [defaultValue, setDefaultValue] = useState<any>();
  const {
    data: categoryDetailData,
    isLoading: isLoadingCategoryDetailData,
    isSuccess: isSuccessCategoryDetailData,
  } = categoriesHooks.useCategory({ id });

  const onFinish = useCallback(
    async (values: any) => {
      await updateCategory({
        ...values,
        _id: categoryDetailData?._id,
      }).then((item: any) => {
        setDefaultValue({
          ...categoryDetailData,
        });
      });
    },
    [categoryDetailData, updateCategory]
  );

  useEffect(() => {
    if (categoryDetailData && !isLoadingCategoryDetailData) {
      setDefaultValue({
        ...categoryDetailData,
      });
    }
  }, [categoryDetailData, isLoadingCategoryDetailData]);

  return (
    <Spin spinning={!isSuccessCategoryDetailData}>
      {defaultValue && <CategoryDetailForm
        key={'productUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingCategoryDetailData || isLoadingUpdateCategory}
      />}
    </Spin>
  );
};

export default CategoryUpdate;
