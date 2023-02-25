import { Button, Space, Popconfirm, Card, Tooltip, Switch, Input, InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { topMenusHooks, topMenusActions } from 'app/containers/Admin/TopMenu';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { TopMenu } from 'models/topMenu';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  name: string;
  url: string;
  _id: string;
  isHidden: boolean;
}
type DataIndex = keyof DataType;

const TopMenuTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [topMenus, setTopMenus] = useState<TopMenu[]>([]);
  const intl = useIntl();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState({});
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const { data, isLoading } = topMenusHooks.useTopMenus({
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    search,
    sort,
  });

  const { mutateAsync: deleteTopMenu, isLoading: isLoadingDeleteTopMenu } = topMenusHooks.useDeleteTopMenu();

  useEffect(() => {
    if (data && (!isLoading || !isLoadingDeleteTopMenu)) {
      setTopMenus(data?.data);
    }
  }, [data, isLoading, isLoadingDeleteTopMenu]);

  const getTopMenuDetail = async (row: DataType) => {
    await dispatch(topMenusActions.setTopMenus(row));
    navigate(`/admin/setting/topMenu/${row?._id}`, { replace: true })
  };

  const onDeleteTopMenu = async (id: string) => {
    await deleteTopMenu(id);
    setTopMenus([...topMenus]);
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
      title: intl.formatMessage({ id: 'setting.topMenu.name' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'setting.topMenu.url' }),
      dataIndex: 'url',
      key: 'url',
      ...getColumnSearchProps('url'),
      sorter: (a, b) => a.url.length - b.url.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'product.isHidden' }),
      dataIndex: 'isHidden',
      key: 'isHidden',
      render: (_, record) => (
        <Switch disabled defaultChecked={record.isHidden} />
      ),
    },
    {
      title: intl.formatMessage({ id: 'setting.topMenu.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteTopMenu(record?._id)}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getTopMenuDetail(record)}/>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.topMenu' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.topMenu' })}
        extra={
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => navigate(`/admin/setting/topMenu/add`, { replace: true })}
          >
            {intl.formatMessage({ id: 'setting.topMenu.button.add' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={topMenus}
          total={data?.pagination?.totalCount}
          isLoading={isLoading}
          page={page}
          pageSize={pageSize}
          onChangePagination={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </Card>
    </>
  );
};

export default TopMenuTable;
