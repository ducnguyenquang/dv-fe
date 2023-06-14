import { Button, Space, Popconfirm, Card, Input, InputRef, Tabs, Tooltip, Switch } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { categoriesHooks, categoriesActions } from 'app/containers/Admin/Category';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { useIntl } from 'react-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { TYPE_OPTIONS } from 'constants/type';
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  description: string;
  slug: string;
  type: string;
  _id: string;
  isHidden: boolean;
  order: number;
}

type DataIndex = keyof DataType;

const CategoryTable = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [categories, setCategories] = useState<any>([]);
  const [tabIndex, setTabIndex] = useState('electrical-cable');
  const [search, setSearch] = useState({
    type: tabIndex === 'electrical-cable' ? 'cap-dien' : 'den-led',
  });
  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sort, setSort] = useState(undefined);
  const searchInput = useRef<InputRef>(null);

  const { data, isLoading } = categoriesHooks.useCategories({
    search,
    sort,
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const { mutateAsync: deleteCategory } = categoriesHooks.useDeleteCategory();
  const { mutateAsync: updateCategory, isLoading: isLoadingUpdateCategory } = categoriesHooks.useUpdateCategory();

  useEffect(() => {
    if (data && !isLoading) {
      setCategories(data.data);
    }
  }, [data, isLoading]);

  const getCategoryDetail = async (row: DataType) => {
    await dispatch(categoriesActions.setCategoryDetail(row));
    navigate(`/admin/category/${row?.slug}`);
  };

  const onDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    setCategories([...categories]);
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
    searchData[dataIndex] = selectedKeys?.[0];
    setSearch(searchData);
  };

  const onTabChange = (key: string) => {
    setTabIndex(key);
    setSearch({
      ...search,
      type: key === 'electrical-cable' ? 'cap-dien' : 'den-led',
    });
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

  const onUpdateCategory = useCallback(
    async (data: any, value: any) => {
      await updateCategory({
        ...data,
        isHidden: value,
      });
    },
    [updateCategory]
  );

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
      title: intl.formatMessage({ id: 'category.categoryName' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'category.slug' }),
      dataIndex: 'slug',
      key: 'slug',
      ...getColumnSearchProps('slug'),
      sorter: (a, b) => a.slug.length - b.slug.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{decodeURIComponent(record.slug)}</>,
    },
    {
      title: intl.formatMessage({ id: 'category.type' }),
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type'),
      sorter: (a, b) => a.slug.length - b.slug.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => {
        const typeName = TYPE_OPTIONS.find(item => item.value === record.type);
        return <>{typeName?.label}</>;
      },
      width: 140,
    },
    {
      title: intl.formatMessage({ id: 'product.order' }),
      dataIndex: 'order',
      key: 'order',
      ...getColumnSearchProps('order'),
      sorter: (a, b) => a.order - b.order,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'product.isHidden' }),
      dataIndex: 'isHidden',
      key: 'isHidden',
      render: (_, record) => (
        <Switch
          disabled={isLoadingUpdateCategory}
          defaultChecked={record.isHidden}
          onChange={checked => onUpdateCategory(record, checked)}
        />
      ),
      width: 130,
    },
    {
      title: intl.formatMessage({ id: 'category.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteCategory(record._id)}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getCategoryDetail(record)} />
          </Tooltip>
        </Space>
      ),
      width: 120,
    },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.category' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.category' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => navigate(`/admin/category/add`)}>
            {intl.formatMessage({ id: 'category.button.addCategory' })}
          </Button>
        }
      >
        <Tabs className="tabs" defaultActiveKey={tabIndex} onChange={onTabChange}>
          <Tabs.TabPane tab={intl.formatMessage({ id: 'common.type.electrical-cable' })} key="electrical-cable">
            <ServiceTable
              columns={columns}
              dataSource={categories}
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
          </Tabs.TabPane>
          <Tabs.TabPane tab={intl.formatMessage({ id: 'common.type.led-light' })} key="led-light">
            <ServiceTable
              columns={columns}
              dataSource={categories}
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
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default CategoryTable;
