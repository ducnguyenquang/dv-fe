import { Button, Space, Popconfirm, Card, Tooltip, Input, InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { advertisementsHooks, advertisementsActions } from 'app/containers/Admin/Advertisement';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { useIntl } from 'react-intl';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  url: string;
  position: string;
  _id: string;
}
type DataIndex = keyof DataType;

const AdvertisementTable = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [advertisements, setAdvertisements] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);
  const [search, setSearch] = useState({});
  const searchInput = useRef<InputRef>(null);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = advertisementsHooks.useAdvertisements({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
    search,
    sort,
  });

  const { mutateAsync: deleteAdvertisement, isLoading: isLoadingDeleteAdvertisement } = advertisementsHooks.useDeleteAdvertisement();

  useEffect(() => {
    if (data && !isLoading) {
      setAdvertisements(data.data);
    }
  }, [data, isLoading]);

  const getAdvertisementDetail = async (row: DataType) => {
    await dispatch(advertisementsActions.setAdvertisementDetail(row));
    navigate(`/admin/advertisement/${row?._id}`, { replace: true })
  };

  const onDeleteAdvertisement = async (id: string) => {
    await deleteAdvertisement(id);
    setAdvertisements([...advertisements]);
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
    // if (searchData) {
    searchData[dataIndex] = selectedKeys?.[0];
    setSearch(searchData);
    // }
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
      title: intl.formatMessage({ id: 'advertisement.name' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'advertisement.url' }),
      dataIndex: 'url',
      key: 'url',
      ...getColumnSearchProps('url'),
      sorter: (a, b) => a.url.length - b.url.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
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
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getAdvertisementDetail(record)} />
          </Tooltip>
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
          <Button type="primary" htmlType="submit" onClick={() => navigate(`/admin/advertisement/add`, { replace: true })}>
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
