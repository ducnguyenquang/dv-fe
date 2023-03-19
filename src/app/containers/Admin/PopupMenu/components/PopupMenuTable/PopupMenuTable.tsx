import { Button, Space, Popconfirm, Card, Tooltip, Input, InputRef, Switch } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { popupMenusHooks, popupMenusActions } from 'app/containers/Admin/PopupMenu';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { PopupMenu } from 'models/popupMenu';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';

interface DataType {
  key: string;
  name: string;
  icon: string;
  url: string;
  _id: string;
  isHidden: boolean;
  order: number;
}
type DataIndex = keyof DataType;

const PopupMenuTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [popupMenus, setPopupMenus] = useState<PopupMenu[]>([]);
  const intl = useIntl();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState({});
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);

  const [isHiddenItem, setIsHiddenItem] = useState<Common>();

  const [isHidden, setIsHidden] = useState<boolean>(false);

  const searchInput = useRef<InputRef>(null);

  const { data, isLoading } = popupMenusHooks.usePopupMenus({
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    search,
    sort,
  });
  const { mutateAsync: deletePopupMenu, isLoading: isLoadingDeletePopupMenu } = popupMenusHooks.useDeletePopupMenu();
  const { mutateAsync: updatePopupMenu, isLoading: isLoadingUpdatePopupMenu } = popupMenusHooks.useUpdatePopupMenu();


  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_POPUP_MENU,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { mutateAsync: updateCommon, isLoading: isLoadingUpdateCommon } = settingPagesHooks.useUpdateTemplate();
  const { mutateAsync: createCommon, isLoading: isLoadingCreateCommon } = settingPagesHooks.useCreateTemplate();

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const hidden = templateData.data?.find((item: any) => item.name === SETTINGS.IS_HIDDEN);

      if (hidden) {
        setIsHiddenItem(hidden);
        setIsHidden(hidden?.value === 'true' ? true : false);
      }
    }
  }, [isLoadingTemplateData, templateData, isHidden]);

  useEffect(() => {
    if (data && (!isLoading || !isLoadingDeletePopupMenu)) {
      setPopupMenus(data?.data);
    }
  }, [data, isLoading, isLoadingDeletePopupMenu]);

  const getPopupMenuDetail = async (row: DataType) => {
    await dispatch(popupMenusActions.setPopupMenus(row));
    navigate(`/admin/setting/popupMenu/${row?._id}`);
  };

  const onDeletePopupMenu = async (id: string) => {
    await deletePopupMenu(id);
  };

  const onPopupMenuUpdate = async (data: any, value: any) => {
    await updatePopupMenu({
      ...data,
      isHidden: value,
    });
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
      title: intl.formatMessage({ id: 'setting.popupMenu.name' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'setting.popupMenu.url' }),
      dataIndex: 'url',
      key: 'url',
      ...getColumnSearchProps('url'),
      sorter: (a, b) => a.url.length - b.url.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
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
        <Switch disabled={isLoadingUpdatePopupMenu} defaultChecked={record.isHidden} onChange={checked => onPopupMenuUpdate(record, checked)}/>
      ),
      width: 130,
    },
    {
      title: intl.formatMessage({ id: 'setting.popupMenu.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeletePopupMenu(record?._id)}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getPopupMenuDetail(record)} />
          </Tooltip>
        </Space>
      ),
      width: 120,
    },
  ];

  const setShowHidden = useCallback(
    async (checked: boolean) => {
      const hidden = !checked;
      setIsHidden(hidden);

      if (isHiddenItem) {
        await updateCommon({
          ...isHiddenItem,
          value: hidden,
        });
      } else {
        await createCommon({
          name: SETTINGS.IS_HIDDEN,
          value: hidden,
          group: PAGE_NAME.P_POPUP_MENU,
        });
      }
    },
    [createCommon, isHiddenItem, updateCommon]
  );

  const getSwitchShowHidden = useCallback(
    () => {
      return (
        <Switch
          defaultChecked={!isHidden}
          checked={!isHidden}
          checkedChildren={intl.formatMessage({ id: 'common.button.show' })}
          unCheckedChildren={intl.formatMessage({ id: 'common.button.hidden' })}
          onChange={checked => setShowHidden(checked)}
        />
      );
    },
    [intl, isHidden, setShowHidden]
  );

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.popupMenu' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.popupMenu' })}
        extra={
          <Space direction="horizontal">
            {getSwitchShowHidden()}
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => navigate(`/admin/setting/popupMenu/add`)}
            >
              {intl.formatMessage({ id: 'setting.popupMenu.button.add' })}
            </Button>
          </Space>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={popupMenus}
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

export default PopupMenuTable;
