import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
import { updateProduct } from 'app/containers/Product/api/updateProduct';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { TagSeo } from 'models/tagSeo';
// import type { ColumnsType } from 'antd/es/table';
// import { productsHooks, productsActions, productsApi } from 'app/containers/Admin/Product';
// import { ServiceTable } from 'common/components/ServiceTable';
// import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
// import { Product } from 'models/product';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { settingsHooks } from '../../hooks';
import TagSeoItems from '../TagSeoItems/TagSeoItems';

const Common = (): JSX.Element => {
  const dispatch = useDispatch();
  const [tagSeos, setTagSeos] = useState<TagSeo[]>([]);
  const intl = useIntl();
  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(1000);
  const { data, isLoading } = settingsHooks.useTagSeos({
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });

  const onChangeTagSeo = (data: TagSeo[]) => {
    setTagSeos(data);
  }

  const { mutateAsync: updateTagSeo, isLoading: isLoadingUpdateTagSeo } = settingsHooks.useUpdateTagSeo();


  // const onUpdateTagSeos = useCallback(async (values: any) => {
  //   await updateTagSeo({
  //     ...values,
  //     // _id: productDetailData?._id,
  //     // images: fileList,
  //     // categories: values.categories.map((item: any) => item.value),
  //   }).then((item: any) => {
  //     // setProductDetail(item?.data);
  //     // setFileList(item?.data?.images);
  //     // setDefaultValue({
  //     //   ...productDetailData,
  //     //   description: decodeURIComponent(productDetailData?.description),
  //     //   specification: decodeURIComponent(productDetailData?.specification),
  //     //   slug: decodeURIComponent(productDetailData?.slug),
  //     //   categories: productDetailData?.categories?.map((item: Category) => {
  //     //     // categories.filter()
  //     //     return { value: item._id, label: item.name };

  //     //   }),
  //     // });
  //   });
  // }, [productDetailData, updateProduct])

  return (
    <>
    <Helmet title={intl.formatMessage({ id: 'page.name.setting' })} />
    <Card title={intl.formatMessage({ id: 'page.name.setting' })}>
        <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={intl.formatMessage({ id: 'page.name.setting.tagSeo' })}
        extra={<Button type="primary" >
            {intl.formatMessage({ id: 'common.button.update' })}
        </Button>}
        >
            <TagSeoItems data={data as any} onChangeTagSeo={onChangeTagSeo}/>
        </Card>

        <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={intl.formatMessage({ id: 'page.name.setting.emailTemplate' })}
        extra={<Button type="primary" >
            {intl.formatMessage({ id: 'common.button.update' })}
        </Button>}
        >
            <TagSeoItems data={data as any} onChangeTagSeo={onChangeTagSeo}/>
        </Card>
    </Card>
    </>
  );
};

export default Common;
