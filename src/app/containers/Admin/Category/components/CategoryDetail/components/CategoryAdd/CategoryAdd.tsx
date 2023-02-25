import { categoriesHooks } from 'app/containers/Admin/Category';
import { CategoryDetailForm } from '../CategoryDetailForm';
import { useCallback } from 'react';

const CategoryAdd = (): JSX.Element => {
  const { mutateAsync: createCategory, isLoading: isLoadingCreateCategory } = categoriesHooks.useCreateCategory();
  const onFinish = useCallback(async (values: any) => {
    await createCategory(values);
  },[createCategory]);

  return <CategoryDetailForm key={'productAdd'} onFinish={onFinish} isLoading={isLoadingCreateCategory} isUpdate={false} />;
};

export default CategoryAdd;
