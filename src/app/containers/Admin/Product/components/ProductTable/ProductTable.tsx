import { Button, Space, Popconfirm, Card, Input, InputRef, Image, Tabs } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { productsHooks, productsActions, productsApi } from 'app/containers/Admin/Product';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { Product } from 'models/product';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { Brand } from 'models/brand';

interface DataType {
  key: string;
  name: string;
  description: string;
  brand: Brand;
  sku: string;
  slug: string;
  categories: Category[];
  _id: string;
}

type DataIndex = keyof DataType;

const ProductTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const intl = useIntl();
  const [tabIndex, setTabIndex] = useState('electrical-cable');

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState({
    type: tabIndex === 'electrical-cable' ? 'cap-dien' : 'den-led',
  });
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);

  const searchInput = useRef<InputRef>(null);

  const { data, isLoading } = productsHooks.useProducts({
    search,
    sort,
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const { mutateAsync: deleteProduct, isLoading: isLoadingDeleteProduct } = productsHooks.useDeleteProduct();

  useEffect(() => {
    if (data && !isLoading) {
      setDataSource(data?.data);
    }
  }, [data, isLoading, isChanged]);

  const getProductDetail = async (row: DataType) => {
    await dispatch(productsActions.setProductDetail(row));
    window.location.href = `/admin/product/${encodeURIComponent(row?.slug)}`;
  };

  const onDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setDataSource([...dataSource]);
    window.location.reload();
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
      title: intl.formatMessage({ id: 'product.productName' }),
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
      title: intl.formatMessage({ id: 'product.sku' }),
      dataIndex: 'slug',
      key: 'slug',
      ...getColumnSearchProps('slug'),
      sorter: (a, b) => a.slug.length - b.slug.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{decodeURIComponent(record.slug)}</>,
    },
    {
      title: intl.formatMessage({ id: 'product.brand' }),
      dataIndex: 'brand',
      key: 'brand',
      ...getColumnSearchProps('brand'),
      sorter: (a, b) => (a?.brand?.name as string).length - (b?.brand?.name as string).length,
      sortDirections: ['descend', 'ascend'],
      showSorterTooltip: false,
      render: (_, record) => record.brand?.name,
    },
    {
      title: intl.formatMessage({ id: 'product.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteProduct(record._id)}
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

  console.log('==== render dataSource', dataSource);

  const onTabChange = (key: string) => {
    setTabIndex(key);
    setSearch({
      ...search,
      type: key === 'electrical-cable' ? 'cap-dien' : 'den-led',
    })
  };

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.product' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.product' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/product/add')}>
            {intl.formatMessage({ id: 'product.button.addProduct' })}
          </Button>
        }
      >
        <Tabs className="tabs" defaultActiveKey={tabIndex} onChange={onTabChange}>
          <Tabs.TabPane tab={intl.formatMessage({ id: 'product.type.electrical-cable' })} key="electrical-cable">
            <ServiceTable
              columns={columns}
              dataSource={dataSource || undefined}
              total={data?.pagination?.totalCount}
              isLoading={isLoading}
              page={page}
              pageSize={pageSize}
              onChangePagination={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              onShowSizeChange={size => {
                setPage(0);
                setPageSize(size);
              }}
              onChange={handleChange}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={intl.formatMessage({ id: 'product.type.led-light' })} key="led-light">
            <ServiceTable
              columns={columns}
              dataSource={dataSource || undefined}
              total={data?.pagination?.totalCount}
              isLoading={isLoading}
              page={page}
              pageSize={pageSize}
              onChangePagination={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              onShowSizeChange={size => {
                setPage(0);
                setPageSize(size);
              }}
              onChange={handleChange}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default ProductTable;
