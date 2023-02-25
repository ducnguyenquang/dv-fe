import { Button, Space, Popconfirm, Card, Tooltip, Input, InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { ordersHooks, ordersActions } from 'app/containers/Admin/Order';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { OrderItem } from 'models/order';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { Customer } from 'models/customer';
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: string;
  orderNumber: string;
  status: string;
  customertotal: string;
  orderItems: OrderItem[];
  customer: Customer;
  total: string;
  _id: string;
}

type DataIndex = keyof DataType;
const OrderTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any>([]);
  const intl = useIntl();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState({});
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);

  const searchInput = useRef<InputRef>(null);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = ordersHooks.useOrders({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
    search,
    sort,
  });

  const { mutateAsync: deleteOrder, isLoading: isLoadingDeleteOrder } = ordersHooks.useDeleteOrder();

  useEffect(() => {
    if (data && (!isLoading || !isLoadingDeleteOrder)) {
      setOrders(data.data);
    }
  }, [data, isLoading, isLoadingDeleteOrder]);

  const getOrderDetail = async (row: DataType) => {
    await dispatch(ordersActions.setOrderDetail(row));
    navigate(`/admin/order/${row?.orderNumber}`, { replace: true });
  };

  const onDeleteOrder = async (id: string) => {
    await deleteOrder(id);
    setOrders([...orders]);
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setIsChanged(true);
    if (sorter.hasOwnProperty('column')) {
      const params: any = {};
      params[`${sorter.field}`] = sorter.order === 'descend' ? 'desc' : 'asc';
      setSort(params);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys?.[0]);
    setSearchedColumn(dataIndex);

    const searchData: any = search;
    searchData[`${dataIndex}`] = selectedKeys?.[0];
    setSearch(searchData);
  };

  const handleReset = (
    selectedKeys: string[],
    dataIndex: DataIndex,
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void
  ) => {
    clearFilters();
    const searchData: any = search;
    setSearchText('');
    if (searchData?.[dataIndex]) {
      delete searchData[dataIndex];
    }
    setSearch(searchData && Object.keys(searchData).length > 0 ? searchData : '');
    handleSearch(searchData, confirm, dataIndex);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              // const searchFunction = () => {
              //   handleSearch(selectedKeys as string[], confirm, dataIndex)
              // }
              clearFilters && handleReset(selectedKeys as string[], dataIndex, clearFilters, confirm);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text => {
      return !!searchText && searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'order.orderNumber' }),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      ...getColumnSearchProps('orderNumber'),
      sorter: (a, b) => a.orderNumber.length - b.orderNumber.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'order.phone' }),
      dataIndex: 'phone',
      ...getColumnSearchProps('customer'),
      sorter: (a, b) => a.customer.phone.length - b.customer.phone.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <div>{record?.customer?.phone}</div>,
    },
    {
      title: intl.formatMessage({ id: 'order.email' }),
      dataIndex: 'email',
      ...getColumnSearchProps('customer'),
      sorter: (a, b) => a.customer.email.length - b.customer.email.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <div>{record?.customer?.email}</div>,
    },
    {
      title: intl.formatMessage({ id: 'order.total' }),
      dataIndex: 'total',
      key: 'total',
      ...getColumnSearchProps('total'),
      sorter: (a, b) => a.total.length - b.total.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'order.customer' }),
      dataIndex: 'customer',
      ...getColumnSearchProps('customer'),
      sorter: (a, b) => a.total.length - b.total.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <div>{record?.customer?.name}</div>,
    },
    {
      title: intl.formatMessage({ id: 'order.status' }),
      dataIndex: 'status',
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a.status.length - b.status.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <div>{intl.formatMessage({ id: `order.status.${record?.status}` })}</div>,
    },
    {
      title: intl.formatMessage({ id: 'order.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.orderNumber })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteOrder(record.orderNumber)}
            // onCancel={cancel}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getOrderDetail(record)} />
          </Tooltip>
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
          <Button type="primary" htmlType="submit" onClick={() => navigate(`/admin/order/add`, { replace: true })}>
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
