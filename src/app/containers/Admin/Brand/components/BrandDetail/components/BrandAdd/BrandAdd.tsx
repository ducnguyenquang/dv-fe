import { brandsHooks } from 'app/containers/Admin/Brand';
import { BrandDetailForm } from '../BrandDetailForm';
import { useCallback } from 'react';

const BrandAdd = (): JSX.Element => {
  const { mutateAsync: createBrand, isLoading: isLoadingCreateBrand } = brandsHooks.useCreateBrand();

  const onFinish = useCallback(
    async (values: any) => {
      await createBrand(values);
    },
    [createBrand]
  );

  return <BrandDetailForm key={'brandAdd'} onFinish={onFinish} isLoading={isLoadingCreateBrand} isUpdate={false} />;
};

export default BrandAdd;
