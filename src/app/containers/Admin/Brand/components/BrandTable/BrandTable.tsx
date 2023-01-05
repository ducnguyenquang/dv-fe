import { Button, Space, Popconfirm, Card, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { brandsHooks, brandsActions, brandsApi } from 'app/containers/Admin/Brand';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { Brand } from 'models/brand';
import { useIntl } from 'react-intl';
// import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import './BrandTable.less'
interface DataType {
  key: string;
  name: string;
  description: string;
  slug: string;
  logo: any;
  _id: string;
}

const BrandTable = (): JSX.Element => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const [brands, setBrands] = useState<any>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = brandsHooks.useBrands({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteBrand, isLoading: isLoadingDeleteBrand } = brandsHooks.useDeleteBrand();

  useEffect(() => {
    if (data && !isLoading) {
      setBrands(data.data);
    }
  }, [data, isLoading]);

  const getBrandDetail = async (row: DataType) => {
    await dispatch(brandsActions.setBrandDetail(row));
    window.location.href = `/admin/brand/${row?.slug}`;
  };

  const onDeleteBrand = async (id: string) => {
    if (!isLoadingDeleteBrand) {
      await deleteBrand(id);
      setBrands([...brands]);
    }
    // window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'brand.name' }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Button type="link" onClick={() => getBrandDetail(record)}>{record.name}</Button>
      ),
    },
    {
      title: intl.formatMessage({ id: 'brand.slug' }),
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: intl.formatMessage({ id: 'brand.logo' }),
      dataIndex: 'logo',
      key: 'logo',
      render: (_, record) => (
        <Image src={record.logo?.[0]?.thumbUrl} className='logo' />
      ),
      
    },
    {
      title: intl.formatMessage({ id: 'brand.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteBrand(record._id)}
            // onCancel={cancel}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <a href="#">{intl.formatMessage({ id: 'common.button.delete' })}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className='brandTableAdmin'>
      <Helmet title={intl.formatMessage({ id: 'page.name.brand' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.brand' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/brand/add')}>
            {intl.formatMessage({ id: 'brand.button.addBrand' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={brands}
          total={data?.pagination?.totalCount}
          isLoading={isLoading}
          page={page}
          pageSize={pageSize}
          onChangePagination={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
          onShowSizeChange={pageSize => {
            setPageSize(pageSize);
          }}
        />
      </Card>
    </div>
  );
};

export default BrandTable;
