import { Button, Space, Table, Tag, Popconfirm, Card, Input, InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { categoriesHooks, categoriesActions, categoriesApi } from 'app/containers/Admin/Category';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { Category } from 'models/category';
import { useIntl } from 'react-intl';
// import { Product } from 'models/product';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { TYPE_OPTIONS } from 'constants/type';

interface DataType {
  key: string;
  name: string;
  description: string;
  slug: string;
  type: string;
  _id: string;
}

type DataIndex = keyof DataType;

const CategoryTable = (): JSX.Element => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const [categories, setCategories] = useState<any>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState();
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);

  const searchInput = useRef<InputRef>(null);

  const { data, isLoading } = categoriesHooks.useCategories({
    search,
    sort,
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteCategory, isLoading: isLoadingDeleteCategory } = categoriesHooks.useDeleteCategory();

  useEffect(() => {
    if (data && !isLoading) {
      // console.log('==== data.data 111', data);
      setCategories(data.data);
    }
  }, [data, isLoading]);

  const getProductDetail = async (row: DataType) => {
    await dispatch(categoriesActions.setCategoryDetail(row));
    window.location.href = `/admin/category/${row?.slug}`;

    // dispatch(productsApi.setEquipmentPagination(pagination));
  };

  const onDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    setCategories([...categories]);
    // window.location.reload();
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setIsChanged(true)
    if (sorter.hasOwnProperty("column")) {
      const params: any = {};
      params[`${sorter.field}`] = sorter.order === "descend" ? 'desc' : 'asc';
      setSort(params);
    }
  };
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
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
    confirm: (param?: FilterConfirmProps) => void,
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
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
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
      )
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
      render: (_, record) => (
        <a href="#" onClick={() => getProductDetail(record)}>
          {record.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'category.slug' }),
      dataIndex: 'slug',
      key: 'slug',
      ...getColumnSearchProps('slug'),
      sorter: (a, b) => a.slug.length - b.slug.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => (
        <>{decodeURIComponent(record.slug)}</>
      ),
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
        const typeName = TYPE_OPTIONS.find(item => item.value === record.type)
        return (
        <>{typeName?.label}</>
      )},
    },
    {
      title: intl.formatMessage({ id: 'category.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteCategory(record._id)}
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
      <Helmet title={intl.formatMessage({ id: 'page.name.category' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.category' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/category/add')}>
            {intl.formatMessage({ id: 'category.button.addCategory' })}
          </Button>
        }
      >
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
      </Card>
    </>
  );
};

export default CategoryTable;
