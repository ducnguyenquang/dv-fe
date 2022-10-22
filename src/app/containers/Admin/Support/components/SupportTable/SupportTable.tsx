import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { supportsHooks, supportsActions, supportsApi } from 'app/containers/Admin/Support';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { Support } from 'models/support';
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

const SupportTable = (): JSX.Element => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const [supports, setSupports] = useState<any>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = supportsHooks.useSupports({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteSupport, isLoading: isLoadingDeleteSupport } = supportsHooks.useDeleteSupport();

  useEffect(() => {
    if (data && !isLoading) {
      // console.log('==== data.data 111', data);
      setSupports(data.data);
    }
  }, [data, isLoading]);

  const getSupportDetail = async (row: DataType) => {
    await dispatch(supportsActions.setSupportDetail(row));
    window.location.href = `/admin/setting/support/${row?._id}`;

    // dispatch(productsApi.setEquipmentPagination(pagination));
  };

  const onDeleteSupport = async (id: string) => {
    await deleteSupport(id);
    setSupports([...supports]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'setting.support.name' }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href="#" onClick={() => getSupportDetail(record)}>
          {record.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'setting.support.title' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: intl.formatMessage({ id: 'setting.support.phone' }),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: intl.formatMessage({ id: 'setting.support.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteSupport(record._id)}
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
      <Helmet title={intl.formatMessage({ id: 'page.name.support' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.support' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/setting/support/add')}>
            {intl.formatMessage({ id: 'setting.support.button.add' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={supports}
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

export default SupportTable;
