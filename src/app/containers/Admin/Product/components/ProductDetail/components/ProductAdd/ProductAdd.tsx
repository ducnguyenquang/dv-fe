import { productsHooks } from 'app/containers/Admin/Product';
import { ProductDetailForm } from '../ProductDetailForm';
import { useCallback } from 'react';

const ProductAdd = (): JSX.Element => {
  const { mutateAsync: createProduct, isLoading: isLoadingCreateProduct } = productsHooks.useCreateProduct();
  
  const onFinish = useCallback(async (values: any) => {
    await createProduct(values);
  },[createProduct]);

  return <ProductDetailForm key={'productAdd'} onFinish={onFinish} isLoading={isLoadingCreateProduct} />;
};

export default ProductAdd;
