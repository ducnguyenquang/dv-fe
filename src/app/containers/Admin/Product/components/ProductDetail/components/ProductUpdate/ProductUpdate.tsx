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

  // const colorOptions = [
  //   {
  //     key: 'black',
  //     label: (
  //       <span className="colorItem">
  //         <span className="colorItem-color" style={{ backgroundColor: '#262425' }} />
  //         Đen
  //       </span>
  //     ),
  //     value: 'black',
  //   },
  //   {
  //     key: 'red',
  //     label: (
  //       <span className="colorItem">
  //         <span className="colorItem-color" style={{ backgroundColor: '#EA1D2C' }} />
  //         Đỏ
  //       </span>
  //     ),
  //     value: 'red',
  //   },
  //   {
  //     key: 'blue',
  //     label: (
  //       <span className="colorItem">
  //         <span className="colorItem-color" style={{ backgroundColor: '#2F378F' }} />
  //         Xanh
  //       </span>
  //     ),
  //     value: 'blue',
  //   },
  //   {
  //     key: 'yellow',
  //     label: (
  //       <span className="colorItem">
  //         <span className="colorItem-color" style={{ backgroundColor: '#FEEF34' }} />
  //         Vàng
  //       </span>
  //     ),
  //     value: 'yellow',
  //   },
  //   {
  //     key: 'ter',
  //     label: (
  //       <span className="colorItem">
  //         <img src="/images/color_ter.jpg" width={16} height={16} />
  //         Ter
  //       </span>
  //     ),
  //     value: 'ter',
  //   },
  //   {
  //     key: 'white',
  //     label: (
  //       <span className="colorItem">
  //         <span className="colorItem-color" style={{ backgroundColor: '#FFFFFF' }} />
  //         Trắng
  //       </span>
  //     ),
  //     value: 'white',
  //   },
  // ];

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
        brand: values.brand.value,
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
        brand: { value: productDetailData.brand?._id, label: productDetailData.brand?.name },
        colors: productDetailData?.colors,
        // colors: productDetailData?.colors?.map((item: string) => {
        //   const index = colorOptions.findIndex(c => c.value === item)
        //   return colorOptions[index];
        // }),
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
        data={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingProductDetail || isLoadingUpdateProduct}
      />
    )
  );
};

export default ProductUpdate;
