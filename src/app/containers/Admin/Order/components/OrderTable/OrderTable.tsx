import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ordersHooks, ordersActions, ordersApi } from 'app/containers/Admin/Order';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
// import { Category } from 'models/category';
import { Order, OrderItem } from 'models/order';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';

interface DataType {
  key: string;
  orderNumber: string;
  email: string;
  total: string;
  orderItems: OrderItem[];
  createdBy: string;
  _id: string;
}

const OrderTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<any>([]);
  const intl = useIntl();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = ordersHooks.useOrders({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteOrder, isLoading: isLoadingDeleteOrder } = ordersHooks.useDeleteOrder();

  useEffect(() => {
    if (data && !isLoading) {
      setOrders(data.data);
    }
  }, [data, isLoading]);

  const getOrderDetail = async (row: DataType) => {
    await dispatch(ordersActions.setOrderDetail(row));
    window.location.href = `/admin/order/${row?.orderNumber}`;
  };

  const onDeleteOrder = async (id: string) => {
    await deleteOrder(id);
    setOrders([...orders]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'order.orderNumber' }),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (_, record) => (
        <Button type='link' onClick={() => getOrderDetail(record)}>
          {record?.orderNumber}
        </Button>
      ),
    },
    {
      title: intl.formatMessage({ id: 'order.email' }),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: intl.formatMessage({ id: 'order.total' }),
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: intl.formatMessage({ id: 'order.createdBy' }),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: intl.formatMessage({ id: 'order.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.orderNumber })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteOrder(record._id)}
            // onCancel={cancel}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Button type='link'>{intl.formatMessage({ id: 'common.button.delete' })}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.order' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.order' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/order/add')}>
            {intl.formatMessage({ id: 'order.button.addOrder' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={orders}
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

export default OrderTable;
