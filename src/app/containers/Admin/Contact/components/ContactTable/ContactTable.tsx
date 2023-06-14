import { Button, Space, Popconfirm, Card, Input, InputRef, Tooltip, Switch } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { contactsHooks, contactsActions } from 'app/containers/Admin/Contact';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { SearchOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  phone: string;
  topic: string;
  email: string;
  _id: string;
}

type DataIndex = keyof DataType;

const ContactTable = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState({});
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const { data, isLoading } = contactsHooks.useContacts({
    search,
    sort,
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const { mutateAsync: deleteContact, isLoading: isLoadingDeleteContact } = contactsHooks.useDeleteContact();
  const { mutateAsync: updateContact, isLoading: isLoadingUpdateContact } = contactsHooks.useUpdateContact();

  useEffect(() => {
    if (data && !isLoading && !isLoadingDeleteContact) {
      setDataSource(data?.data);
    }
  }, [data, isLoading, isChanged, isLoadingDeleteContact]);

  const getContactDetail = async (row: DataType) => {
    await dispatch(contactsActions.setContactDetail(row));
    navigate(`/admin/contact/${encodeURIComponent(row?._id)}`);
  };

  const onDeleteContact = async (id: string) => {
    await deleteContact(id);
    setDataSource([...dataSource]);
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

  const onUpdateContact = useCallback(
    async (data: any, value: any) => {
      await updateContact({
        ...data,
        isHidden: value,
      });
    },
    [updateContact]
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
      title: intl.formatMessage({ id: 'contact.name' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'contact.phone' }),
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      sorter: (a, b) => a.phone.length - b.phone.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{decodeURIComponent(record.phone)}</>,
      width: 200,
    },
    {
      title: intl.formatMessage({ id: 'contact.email' }),
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      // width: 120,
    },
    {
      title: intl.formatMessage({ id: 'contact.topic' }),
      dataIndex: 'topic',
      key: 'topic',
      ...getColumnSearchProps('topic'),
      sorter: (a, b) => a.topic.length - b.topic.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
      // width: 120,
    },
    {
      title: intl.formatMessage({ id: 'contact.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteContact(record._id)}
            // onCancel={cancel}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getContactDetail(record)} />
          </Tooltip>
        </Space>
      ),
      width: 120,
    },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.contact' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.contact' })}
        // extra={
        //   <Button type="primary" htmlType="submit" onClick={() => navigate(`/admin/contact/add`)}>
        //     {intl.formatMessage({ id: 'contact.button.add' })}
        //   </Button>
        // }
      >
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
      </Card>
    </>
  );
};

export default ContactTable;
