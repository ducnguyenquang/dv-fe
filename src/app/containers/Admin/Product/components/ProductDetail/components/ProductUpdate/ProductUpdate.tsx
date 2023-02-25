import { Category } from 'models/category';
import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { UploadFile } from 'antd/es/upload/interface';
import { productsHooks } from 'app/containers/Admin/Product';
import { ProductDetailForm } from '../ProductDetailForm';
import { useCallback } from 'react';

const ProductUpdate = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateProduct, isLoading: isLoadingUpdateProduct } = productsHooks.useUpdateProduct();

  const [productDetail, setProductDetail] = useState<Product>({});
  const [defaultValue, setDefaultValue] = useState<any>();
  const [categories, setCategories] = useState<Category[]>([]);

  const { data: categoriesData, isLoading: isLoadingCategories } = productsHooks.useCategories({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });
  const { data: productDetailData, isLoading: isLoadingProductDetail } = productsHooks.useProduct({ id });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(
    async (values: any) => {
      await updateProduct({
        ...values,
        _id: productDetailData?._id,
        categories: values.categories.map((item: any) => (typeof item === 'string' ? item : item.value)),
      }).then((item: any) => {
        setProductDetail(item?.data);
        setFileList(item?.data?.images);
        setDefaultValue({
          ...productDetailData,
          description: decodeURIComponent(productDetailData?.description),
          specification: decodeURIComponent(productDetailData?.specification),
          slug: decodeURIComponent(productDetailData?.slug),
        });
      });
    },
    [productDetailData, updateProduct]
  );

  useEffect(() => {
    if (productDetailData && !isLoadingProductDetail) {
      setProductDetail(productDetailData);
      setFileList(productDetailData?.images);
      setDefaultValue({
        ...productDetailData,
        description: decodeURIComponent(productDetailData?.description),
        specification: decodeURIComponent(productDetailData?.specification),
        slug: decodeURIComponent(productDetailData?.slug),
        categories: productDetailData?.categories?.map((item: Category) => {
          return { value: item?._id, label: item?.name };
        }),
      });
    }
  }, [productDetailData, isLoadingProductDetail, categoriesData]);

  useEffect(() => {
    if (categoriesData && !isLoadingCategories) {
      setCategories(categoriesData.data);
    }
  }, [categoriesData, isLoadingCategories]);

  return (
    defaultValue && (
      <ProductDetailForm
        key={'productUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingProductDetail || isLoadingUpdateProduct}
      />
    )
  );
};

export default ProductUpdate;
