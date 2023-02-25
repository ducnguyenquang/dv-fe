import { Button, Space, Popconfirm, Card, Image, Tooltip, Input, InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { brandsHooks, brandsActions } from 'app/containers/Admin/Brand';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { useIntl } from 'react-intl';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import './BrandTable.less';
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  description: string;
  slug: string;
  logo: any;
  _id: string;
}
type DataIndex = keyof DataType;

const BrandTable = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [brands, setBrands] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);
  const [search, setSearch] = useState({});
  const searchInput = useRef<InputRef>(null);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = brandsHooks.useBrands({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
    search,
    sort,
  });

  const { mutateAsync: deleteBrand, isLoading: isLoadingDeleteBrand } = brandsHooks.useDeleteBrand();

  useEffect(() => {
    if (data && !isLoading) {
      setBrands(data.data);
    }
  }, [data, isLoading]);

  const getBrandDetail = async (row: DataType) => {
    await dispatch(brandsActions.setBrandDetail(row));
    navigate(`/admin/brand/${row?.slug}`, { replace: true });
  };

  const onDeleteBrand = async (id: string) => {
    if (!isLoadingDeleteBrand) {
      await deleteBrand(id);
      setBrands([...brands]);
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
    searchData[dataIndex] = selectedKeys?.[0];
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
      title: intl.formatMessage({ id: 'brand.name' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'brand.slug' }),
      dataIndex: 'slug',
      key: 'slug',
      ...getColumnSearchProps('slug'),
      sorter: (a, b) => a.slug.length - b.slug.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{decodeURIComponent(record.slug)}</>,
    },
    {
      title: intl.formatMessage({ id: 'brand.logo' }),
      dataIndex: 'logo',
      key: 'logo',
      render: (_, record) => <Image src={record.logo?.[0]?.thumbUrl} className="logo" />,
    },
    {
      title: intl.formatMessage({ id: 'brand.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteBrand(record._id)}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getBrandDetail(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="brandTableAdmin">
      <Helmet title={intl.formatMessage({ id: 'page.name.brand' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.brand' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => navigate(`/admin/brand/add`, { replace: true })}>
            {intl.formatMessage({ id: 'brand.button.addBrand' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={brands}
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
    </div>
  );
};

export default BrandTable;
