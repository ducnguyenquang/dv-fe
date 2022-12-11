import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { popupMenusHooks, popupMenusActions, popupMenusApi } from 'app/containers/Admin/PopupMenu';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
import { PopupMenu } from 'models/popupMenu';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

interface DataType {
  key: string;
  name: string;
  icon: string;
  url: string;
  _id: string;
}

const PopupMenuTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [popupMenus, setPopupMenus] = useState<PopupMenu[]>([]);
  const intl = useIntl();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = popupMenusHooks.usePopupMenus({
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const { mutateAsync: deletePopupMenu, isLoading: isLoadingDeletePopupMenu } = popupMenusHooks.useDeletePopupMenu();

  useEffect(() => {
    if (data && !isLoading) {
      // console.log('==== data.data 111', data);
      setPopupMenus(data?.data);
    }
  }, [data, isLoading]);
  // console.log('==== data', data)

  // console.log('==== EmailTemplates', EmailTemplates);

  const getPopupMenuDetail = async (row: DataType) => {
    await dispatch(popupMenusActions.setPopupMenus(row));
    window.location.href = `/admin/setting/popupMenu/${row?._id}`;

    // dispatch(EmailTemplatesApi.setEquipmentPagination(pagination));
  };

  const onDeletePopupMenu = async (id: string) => {
    // console.log('==== onDeletePopupMenu id', id)
    await deletePopupMenu(id);
    setPopupMenus([...popupMenus]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'setting.popupMenu.name' }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href="#" onClick={() => getPopupMenuDetail(record)}>
          {record.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'setting.popupMenu.url' }),
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: intl.formatMessage({ id: 'setting.popupMenu.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, {name: record?.name})}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeletePopupMenu(record?._id)}
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

  // console.log('==== popupMenus', popupMenus)

  return (
    <>
      <Helmet
        title={intl.formatMessage({ id: 'page.name.popupMenu' })}
      />
      <Card
        title={intl.formatMessage({ id: 'page.name.popupMenu' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/setting/popupMenu/add')}>
            {intl.formatMessage({ id: 'setting.popupMenu.button.add' })}
          </Button>
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
          onShowSizeChange={size => {
            // console.log('==== onShowSizeChange', size);

            // setPage(0);
            // setPageSize(size);
          }}
        />
      </Card>
    </>
  );
};

export default PopupMenuTable;
