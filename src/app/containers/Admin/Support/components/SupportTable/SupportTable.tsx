import { Button, Space, Popconfirm, Card, Input, InputRef, Tooltip, Switch, Collapse } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { supportsHooks, supportsActions } from 'app/containers/Admin/Support';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { useIntl } from 'react-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import './SupportTable.less';
interface DataType {
  key: string;
  name: string;
  title: string;
  phone: string;
  _id: string;
}
type DataIndex = keyof DataType;

const SupportTable = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [supports, setSupports] = useState<any>([]);

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [search, setSearch] = useState({});
  const [sort, setSort] = useState(undefined);
  const [isChanged, setIsChanged] = useState(false);
  const searchInput = useRef<InputRef>(null);
  const [isHiddenItem, setIsHiddenItem] = useState<Common>();
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [fontSizeItem, setFontSizeItem] = useState<Common>();
  const [isHiddenPhoneIconItem, setIsHiddenPhoneIconItem] = useState<Common>();

  const [fontSize, setFontSize] = useState<string>();
  const [isHiddenPhoneIcon, setIsHiddenPhoneIcon] = useState<boolean>();
  // const fontSizeRef = useRef(fontSize || 24);
  const [updateItems, setUpdateItems] = useState<Common[]>([]);
  const [createItems, setCreateItems] = useState<Common[]>([]);
  const { data, isLoading } = supportsHooks.useSupports({
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    search,
    sort,
  });

  const { mutateAsync: deleteSupport, isLoading: isLoadingDeleteSupport } = supportsHooks.useDeleteSupport();

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_SUPPORT,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { mutateAsync: updateCommon } = settingPagesHooks.useUpdateTemplate();
  const { mutateAsync: updateCommons } = settingPagesHooks.useUpdateTemplates();
  const { mutateAsync: createCommon } = settingPagesHooks.useCreateTemplate();
  const { mutateAsync: createCommons } = settingPagesHooks.useCreateTemplates();
  const { mutateAsync: deleteCommon } = settingPagesHooks.useDeleteTemplate();

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const hidden = templateData.data?.find((item: any) => item.name === SETTINGS.IS_HIDDEN);
      const hiddenPhoneIcon = templateData.data?.find((item: any) => item.name === SETTINGS.IS_HIDDEN_PHONE_ICON);
      const fontSize = templateData.data?.find((item: any) => item.name === SETTINGS.FONT_SIZE);

      if (hidden) {
        setIsHiddenItem(hidden);
        setIsHidden(hidden?.value === 'true' ? true : false);
      }

      if (hiddenPhoneIcon) {
        setIsHiddenPhoneIconItem(hiddenPhoneIcon);
        // setIsHiddenPhoneIcon(hiddenPhoneIcon?.value === 'true' ? true : false);
      }

      if (fontSize) {
        setFontSizeItem(fontSize);
        // setFontSize(fontSize?.value);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  useEffect(() => {
    if (data && (!isLoading || !isLoadingDeleteSupport)) {
      setSupports(data.data);
    }
  }, [data, isLoading, isLoadingDeleteSupport]);

  const getSupportDetail = async (row: DataType) => {
    await dispatch(supportsActions.setSupportDetail(row));
    navigate(`/admin/setting/support/${row?._id}`);
  };

  const onDeleteSupport = async (id: string) => {
    await deleteSupport(id);
    setSupports([...supports]);
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
      title: intl.formatMessage({ id: 'setting.support.name' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'setting.support.title' }),
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.length - b.title.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'setting.support.phone' }),
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      sorter: (a, b) => a.phone.length - b.phone.length,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage({ id: 'setting.support.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: record?.name })}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteSupport(record._id)}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Tooltip title={intl.formatMessage({ id: 'common.button.delete' })}>
              <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title={intl.formatMessage({ id: 'common.button.update' })}>
            <Button shape="circle" icon={<FormOutlined />} onClick={() => getSupportDetail(record)} />
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
          group: PAGE_NAME.P_SUPPORT,
        });
      }
    },
    [createCommon, isHiddenItem, updateCommon]
  );

  const getSwitchShowHidden = useCallback(() => {
    return (
      <Switch
        defaultChecked={!isHidden}
        checked={!isHidden}
        checkedChildren={intl.formatMessage({ id: 'common.button.show' })}
        unCheckedChildren={intl.formatMessage({ id: 'common.button.hidden' })}
        onChange={checked => setShowHidden(checked)}
      />
    );
  }, [intl, isHidden, setShowHidden]);

  const resetIsHiddenPhoneIcon = useCallback(async () => {
    if (isHiddenPhoneIconItem) {
      await deleteCommon(isHiddenPhoneIconItem._id);
      // setIsHiddenPhoneIcon(false);
    }
  }, [deleteCommon, isHiddenPhoneIconItem]);

  const saveIsHiddenPhoneIcon = useCallback(async () => {
    // const checked = isHiddenPhoneIcon;
    // setIsHiddenPhoneIcon(hidden);
    console.log('==== saveIsHiddenPhoneIcon isHiddenPhoneIcon', isHiddenPhoneIcon);
    if (isHiddenPhoneIcon !== undefined) {
      const hidden = !isHiddenPhoneIcon;

      console.log('==== isHiddenPhoneIconItem', isHiddenPhoneIconItem);
      console.log('==== hidden', hidden);

      if (isHiddenPhoneIconItem) {
        console.log('===1');
        const isHidden = isHiddenPhoneIconItem?.value === 'true' ? true : false;
        console.log('==== hidden.toString() !== isHiddenPhoneIconItem?.value', hidden !== isHidden);

        // if (hidden !== isHidden) {
        await updateCommon({
          ...isHiddenPhoneIconItem,
          value: hidden,
        });
        // }
      } else {
        await createCommon({
          name: SETTINGS.IS_HIDDEN_PHONE_ICON,
          group: PAGE_NAME.P_SUPPORT,
          value: hidden,
        });
      }
      setIsHiddenPhoneIcon(undefined);
    }
  }, [createCommon, isHiddenPhoneIcon, isHiddenPhoneIconItem, updateCommon]);

  const saveFontSize = useCallback(async () => {
    if (fontSize !== undefined) {
      if (fontSizeItem) {
        if (fontSize !== fontSizeItem.value) {
          await updateCommon({
            ...fontSizeItem,
            value: fontSize,
          });
        }
      } else {
        await createCommon({
          name: SETTINGS.FONT_SIZE,
          group: PAGE_NAME.P_SUPPORT,
          value: fontSize,
        });
      }
      setFontSize(undefined);
    }
  }, [createCommon, fontSize, fontSizeItem, updateCommon]);

  const resetFontSize = useCallback(async () => {
    if (fontSizeItem) {
      await deleteCommon(fontSizeItem._id);
      // setFontSize('24');
    }
  }, [deleteCommon, fontSizeItem]);

  const saveSupportSettings = async () => {
    // const updateItems = [];
    // const createItems = [];
    if (fontSize !== undefined) {
      if (fontSizeItem) {
        if (fontSize !== fontSizeItem.value) {
          updateItems.push({
            ...fontSizeItem,
            value: fontSize,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.FONT_SIZE,
          group: PAGE_NAME.P_SUPPORT,
          value: fontSize,
        });
      }
    }

    if (isHiddenPhoneIcon !== undefined) {
      const hidden = !isHiddenPhoneIcon;
      if (isHiddenPhoneIconItem) {
        const isHidden = isHiddenPhoneIconItem?.value === 'true' ? true : false;
        updateItems.push({
          ...isHiddenPhoneIconItem,
          value: hidden.toString(),
        });
        // }
      } else {
        createItems.push({
          name: SETTINGS.IS_HIDDEN_PHONE_ICON,
          group: PAGE_NAME.P_SUPPORT,
          value: hidden.toString(),
        });
      }
    }

    if (updateItems.length > 0) {
      await updateCommons({ data: updateItems });
      setUpdateItems([])
    }

    if (createItems.length > 0) {
      await createCommons({ data: createItems });
      setCreateItems([])
    }

    

    // await saveFontSize();
    // await saveIsHiddenPhoneIcon();
  };

  const resetSupportSettings = async () => {
    await resetFontSize();
    await resetIsHiddenPhoneIcon();
  };

  // const onChangeFontSize = (value: string) => {
  //   setUpdateItems([...updateItems, ])
  // }

  return (
    <div className="a-suppport">
      <Helmet title={intl.formatMessage({ id: 'page.name.support' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.support' })}
        extra={
          <Space direction="horizontal">
            {getSwitchShowHidden()}
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => navigate(`/admin/setting/support/add`)}
            >
              {intl.formatMessage({ id: 'setting.support.button.add' })}
            </Button>
          </Space>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={supports}
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

        <Collapse style={{ marginTop: '2rem' }}>
          <Collapse.Panel header={intl.formatMessage({ id: 'common.setting.advance' })} key="1">
            <div className="setting">
              <div className="setting-block">
                <span className="setting-block-label">
                  {intl.formatMessage({ id: 'setting.support.isHiddenPhoneIcon' })}
                </span>
                <Switch
                  defaultChecked={isHiddenPhoneIconItem?.value === 'true' ? false : true}
                  // checked={!isHiddenPhoneIcon}
                  checkedChildren={intl.formatMessage({ id: 'common.button.show' })}
                  unCheckedChildren={intl.formatMessage({ id: 'common.button.hidden' })}
                  onChange={checked => setIsHiddenPhoneIcon(checked)}
                />
              </div>
              <div className="setting-block">
                <span className="setting-block-label">{intl.formatMessage({ id: 'setting.support.fontSize' })}</span>
                <Input
                  value={fontSize || fontSizeItem?.value || 24}
                  type="number"
                  className="fontSize"
                  onChange={e => {
                    setFontSize(e.target.value);
                  }}
                />
              </div>
            </div>
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetSupportSettings}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveSupportSettings}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          </Collapse.Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default SupportTable;
