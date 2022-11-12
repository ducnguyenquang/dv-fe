import { Button, Space, Popconfirm, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { advertisementsHooks, advertisementsActions } from 'app/containers/Admin/Advertisement';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { useIntl } from 'react-intl';
// import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

interface DataType {
  key: string;
  name: string;
  url: string;
  position: string;
  _id: string;
}

const AdvertisementTable = (): JSX.Element => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const [advertisements, setAdvertisements] = useState<any>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = advertisementsHooks.useAdvertisements({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteAdvertisement, isLoading: isLoadingDeleteAdvertisement } = advertisementsHooks.useDeleteAdvertisement();

  useEffect(() => {
    if (data && !isLoading) {
      setAdvertisements(data.data);
    }
  }, [data, isLoading]);

  const getAdvertisementDetail = async (row: DataType) => {
    await dispatch(advertisementsActions.setAdvertisementDetail(row));
    window.location.href = `/admin/advertisement/${row?._id}`;
  };

  const onDeleteAdvertisement = async (id: string) => {
    await deleteAdvertisement(id);
    setAdvertisements([...advertisements]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'advertisement.name' }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href="#" onClick={() => getAdvertisementDetail(record)}>
          {record.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'advertisement.url' }),
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: intl.formatMessage({ id: 'advertisement.position' }),
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: intl.formatMessage({ id: 'advertisement.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteAdvertisement(record._id)}
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
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.advertisement' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.advertisement' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/advertisement/add')}>
            {intl.formatMessage({ id: 'advertisement.button.add' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={advertisements}
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
    </>
  );
};

export default AdvertisementTable;
