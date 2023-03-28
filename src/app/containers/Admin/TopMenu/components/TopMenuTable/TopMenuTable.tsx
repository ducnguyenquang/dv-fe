import { Button, Space, Popconfirm, Card, Tooltip, Switch, Input, InputRef, Collapse } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { topMenusHooks, topMenusActions } from 'app/containers/Admin/TopMenu';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { TopMenu } from 'models/topMenu';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { SETTINGS, PAGE_NAME, MODULE_NAME } from 'constants/common';
import { Common } from 'models/common';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';
import ColorPicker from 'app/containers/Admin/SettingPage/components/Template/components/ColorPicker/ColorPicker';
import './TopMenuTable.less';

interface DataType {
  key: string;
  name: string;
  url: string;
  _id: string;
  isHidden: boolean;
  order: number
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

  const [updateItems, setUpdateItems] = useState<Common[]>([]);
  const [createItems, setCreateItems] = useState<Common[]>([]);
  
  const [textColorItem, setTextColorItem] = useState<Common>();
  const [textColor, setTextColor] = useState<string>();

  const [backgroundColorItem, setBackgroundColorItem] = useState<Common>();
  const [backgroundColor, setBackgroundColor] = useState<string>();

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_TEMPLATE,
      type: MODULE_NAME.M_TOP_HEADER_BLOCK,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const textColorTemp = templateData.data?.find((item: any) => item.name === SETTINGS.TOP_HEADER_TEXT_COLOR);
      const backgrondColorTemp = templateData.data?.find((item: any) => item.name === SETTINGS.TOP_HEADER_BACKGROUND_COLOR);

      if (textColorTemp) {
        setTextColorItem(textColorTemp);
        setTextColor(textColorTemp?.value);
      }
      if (backgrondColorTemp) {
        setBackgroundColorItem(backgrondColorTemp);
        setBackgroundColor(backgrondColorTemp?.value);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  const { data, isLoading } = topMenusHooks.useTopMenus({
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    search,
    sort,
  });

  const { mutateAsync: updateCommons } = settingPagesHooks.useUpdateTemplates();
  const { mutateAsync: createCommons } = settingPagesHooks.useCreateTemplates();
  const { mutateAsync: deleteCommon } = settingPagesHooks.useDeleteTemplate();

  const { mutateAsync: deleteTopMenu, isLoading: isLoadingDeleteTopMenu } = topMenusHooks.useDeleteTopMenu();
  const { mutateAsync: updateTopMenu, isLoading: isLoadingUpdateTopMenu } = topMenusHooks.useUpdateTopMenu();

  useEffect(() => {
    if (data && (!isLoading || !isLoadingDeleteTopMenu)) {
      setTopMenus(data?.data);
    }
  }, [data, isLoading, isLoadingDeleteTopMenu]);

  const getTopMenuDetail = async (row: DataType) => {
    await dispatch(topMenusActions.setTopMenus(row));
    navigate(`/admin/setting/topMenu/${row?._id}`)
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

  const onUpdate = async (data: any, value: any) => {
    await updateTopMenu({
      ...data,
      isHidden: value,
    });
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
        <Switch disabled={isLoadingUpdateTopMenu} defaultChecked={record.isHidden} onChange={checked => onUpdate(record, checked)}/>
      ),
      width: 130,
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
      width: 120,
    },
  ];

  const saveBackgroundColor = useCallback(async () => {
    if (backgroundColor !== undefined) {
      if (backgroundColorItem) {
        if (backgroundColor !== backgroundColorItem.value) {
          updateItems.push({
            ...backgroundColorItem,
            type: MODULE_NAME.M_TOP_HEADER_BLOCK,
            value: backgroundColor,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.TOP_HEADER_BACKGROUND_COLOR,
          value: backgroundColor,
          type: MODULE_NAME.M_TOP_HEADER_BLOCK,
          group: PAGE_NAME.P_TEMPLATE,
        });
      }
    }
  }, [backgroundColor, backgroundColorItem, updateItems, createItems]);

  const saveTextColor = useCallback(async () => {
    if (textColor !== undefined) {
      if (textColorItem) {
        if (textColor !== textColorItem.value) {
          updateItems.push({
            ...textColorItem,
            type: MODULE_NAME.M_TOP_HEADER_BLOCK,
            value: textColor,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.TOP_HEADER_TEXT_COLOR,
          value: textColor,
          type: MODULE_NAME.M_TOP_HEADER_BLOCK,
          group: PAGE_NAME.P_TEMPLATE,
        });
      }
    }
  }, [textColor, textColorItem, updateItems, createItems]);

  const saveTopHeaderSettings = async () => {
    saveBackgroundColor();
    saveTextColor();

    if (updateItems.length > 0) {
      await updateCommons({ data: updateItems });
      setUpdateItems([]);
    }

    if (createItems.length > 0) {
      await createCommons({ data: createItems });
      setCreateItems([]);
    }
  };

  const resetBackgroundColor = useCallback(async () => {
    if (backgroundColorItem) {
      await deleteCommon(backgroundColorItem._id);
      setBackgroundColor('');
    }
  }, [backgroundColorItem, deleteCommon]);

  const resetTextColor = useCallback(async () => {
    if (textColorItem) {
      await deleteCommon(textColorItem?._id);
      setTextColor('');
    }
  }, [deleteCommon, textColorItem]);


  const resetTopHeaderSettings = async () => {
    await resetBackgroundColor();
    await resetTextColor();
  };

  return (
    <div className='a-topMenu'>
      <Helmet title={intl.formatMessage({ id: 'page.name.topMenu' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.topMenu' })}
        extra={
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => navigate(`/admin/setting/topMenu/add`)}
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
        <Collapse style={{ marginTop: '2rem' }}>
          <Collapse.Panel header={intl.formatMessage({ id: 'common.setting.advance' })} key="1">
            <div className="setting">
              <div className="setting-block">
                <span className="setting-block-label">{intl.formatMessage({ id: 'setting.topMenu.bgColor' })}</span>
                {backgroundColor && <ColorPicker initialColor={backgroundColor} saveColor={setBackgroundColor} />}
                {!backgroundColorItem && !backgroundColor && <ColorPicker initialColor={backgroundColor} saveColor={setBackgroundColor} />}
              </div>
              <div className="setting-block">
                <span className="setting-block-label">{intl.formatMessage({ id: 'setting.topMenu.textColor' })}</span>
                {textColor && <ColorPicker initialColor={textColor} saveColor={setTextColor} />}
                {!textColorItem && !textColor && <ColorPicker initialColor={textColor} saveColor={setTextColor} />}
              </div>
            </div>
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetTopHeaderSettings}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveTopHeaderSettings}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          </Collapse.Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default TopMenuTable;
