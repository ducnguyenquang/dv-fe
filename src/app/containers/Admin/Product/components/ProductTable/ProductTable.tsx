import { Button, Space, Popconfirm, Card, Input, InputRef, Switch, Tabs, Tooltip } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { productsHooks, productsActions } from 'app/containers/Admin/Product';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { Brand } from 'models/brand';
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {format} from 'date-fns';

interface DataType {
  key: string;
  name: string;
  description: string;
  brand: Brand;
  sku: string;
  slug: string;
  categories: Category[];
  _id: string;
  isHidden: boolean;
  type: string;
  updatedAt: string;
}

type DataIndex = keyof DataType;

const TAB_KEYS = {
  ELECTRICAL_CABLE: 'cap-dien',
  LED_LIGHT: 'den-led',
  ALL: 'all',
};

const ProductTable = (): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [tabIndex, setTabIndex] = useState(TAB_KEYS.ELECTRICAL_CABLE);
  const navigate = useNavigate();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState<{ type?: string }>({
    type: tabIndex,
  });
  const [sort, setSort] = useState({
    updatedAt: 'desc',
  });
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

  const { mutateAsync: updateProduct, isLoading: isLoadingUpdateProduct } = productsHooks.useUpdateProduct();
  const { mutateAsync: deleteProduct, isLoading: isLoadingDeleteProduct } = productsHooks.useDeleteProduct();

  useEffect(() => {
    if (data && !isLoading && !isLoadingDeleteProduct) {
      setDataSource(data?.data);
    }
  }, [data, isLoading, isChanged, isLoadingDeleteProduct]);

  const getProductDetail = useCallback(
    async (row: DataType) => {
      await dispatch(productsActions.setProductDetail(row));
      navigate(`/admin/product/${encodeURIComponent(row?.slug)}`);
    },
    [dispatch, navigate]
  );

  const onDeleteProduct = useCallback(
    async (id: string) => {
      await deleteProduct(id);
      setDataSource([...dataSource]);
    },
    [dataSource, deleteProduct]
  );

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setIsChanged(true);
    if (sorter.hasOwnProperty('column')) {
      const params: any = {};
      params[`${sorter.field}`] = sorter.order === 'descend' ? 'desc' : 'asc';
      setSort(params);
    }
  };

  const handleSearch = useCallback(
    (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
      confirm();
      setSearchText(selectedKeys?.[0]);
      setSearchedColumn(dataIndex);

      const searchData: any = search;
      searchData[`${dataIndex}`] = selectedKeys?.[0];
      setSearch(searchData);
    },
    [search]
  );

  const handleReset = useCallback(
    (
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
    },
    [handleSearch, search]
  );

  const getColumnSearchProps = useCallback(
    (dataIndex: DataIndex): ColumnType<DataType> => ({
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
    }),
    [handleReset, handleSearch, searchText, searchedColumn]
  );

  const onUpdateProduct = useCallback(
    async (data: any, value: any) => {
      await updateProduct({
        ...data,
        isHidden: value,
      });
    },
    [updateProduct]
  );

  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
      {
        title: intl.formatMessage({ id: 'product.productName' }),
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.length - b.name.length,
        showSorterTooltip: false,
        sortDirections: ['descend', 'ascend'],
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
        title: intl.formatMessage({ id: 'product.updatedAt' }),
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        ...getColumnSearchProps('updatedAt'),
        sorter: (a, b) => Number(a?.updatedAt) - Number(b?.updatedAt),
        sortDirections: ['descend', 'ascend'],
        showSorterTooltip: false,
        render: (_, record) => format(new Date(record.updatedAt), 'dd/MM/yyyy HH:mm:ss'),
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
        title: intl.formatMessage({ id: 'product.isHidden' }),
        dataIndex: 'isHidden',
        key: 'isHidden',
        render: (_, record) => (
          <Switch
            disabled={isLoadingUpdateProduct}
            defaultChecked={record.isHidden}
            onChange={checked => onUpdateProduct(record, checked)}
          />
        ),
        width: 130,
      },
      {
        title: intl.formatMessage({ id: 'product.action' }),
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Popconfirm
              title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
              onVisibleChange={() => console.log('visible change')}
              onConfirm={() => onDeleteProduct(record._id)}
              okText={intl.formatMessage({ id: 'common.button.ok' })}
              cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
            >
              <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
                <Button shape="circle" icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
            <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
              <Button shape="circle" icon={<FormOutlined />} onClick={() => getProductDetail(record)} />
            </Tooltip>
          </Space>
        ),
        width: 120,
      },
    ];
  }, [getColumnSearchProps, getProductDetail, intl, isLoadingUpdateProduct, onDeleteProduct, onUpdateProduct]);

  const onTabChange = (key: string) => {
    setTabIndex(key);
    setSearch({
      ...search,
      type: key === TAB_KEYS.ALL ? undefined : key,
    });
  };

  const renderTableData = useCallback(() => {
    return (
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
    );
  }, [columns, data?.pagination?.totalCount, dataSource, isLoading, page, pageSize]);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.product' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.product' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => navigate(`/admin/product/add`)}>
            {intl.formatMessage({ id: 'product.button.addProduct' })}
          </Button>
        }
      >
        <Tabs className="tabs" defaultActiveKey={tabIndex} onChange={onTabChange}>
          <Tabs.TabPane
            tab={intl.formatMessage({ id: 'product.type.electrical-cable' })}
            key={TAB_KEYS.ELECTRICAL_CABLE}
          >
            {renderTableData()}
          </Tabs.TabPane>
          <Tabs.TabPane tab={intl.formatMessage({ id: 'product.type.led-light' })} key={TAB_KEYS.LED_LIGHT}>
            {renderTableData()}
          </Tabs.TabPane>
          <Tabs.TabPane tab={intl.formatMessage({ id: 'product.type.all' })} key={TAB_KEYS.ALL}>
            {renderTableData()}
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default ProductTable;
