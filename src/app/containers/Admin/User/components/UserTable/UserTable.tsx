import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { usersHooks, usersActions, usersApi } from 'app/containers/Admin/User';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
// import { Category } from 'models/category';
import { User } from 'models/user';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';

interface DataType {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  // categories: Category[];
  _id: string;
}

const UserTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<any>([]);
  const intl = useIntl();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = usersHooks.useUsers({
    pagination: {
      limit: pageSize,
      offset: page - 1,
    },
  });

  const { mutateAsync: deleteUser, isLoading: isLoadingDeleteUser } = usersHooks.useDeleteUser();

  useEffect(() => {
    if (data && !isLoading) {
      setUsers(data.data);
    }
  }, [data, isLoading]);

  const getUserDetail = async (row: DataType) => {
    await dispatch(usersActions.setUserDetail(row));
    window.location.href = `/admin/user/${row?._id}`;
  };

  const onDeleteUser = async (id: string) => {
    await deleteUser(id);
    setUsers([...users]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'user.firstName' }),
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_, record) => (
        <Button type='link' onClick={() => getUserDetail(record)}>
          {record?.firstName}
        </Button>
      ),
    },
    {
      title: intl.formatMessage({ id: 'user.lastName' }),
      dataIndex: 'lastName',
      key: 'lastName',
      render: (_, record) => (
        <Button type='link' onClick={() => getUserDetail(record)}>
          {record?.lastName}
        </Button>
      ),
    },
    {
      title: intl.formatMessage({ id: 'user.email' }),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: intl.formatMessage({ id: 'user.role' }),
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: intl.formatMessage({ id: 'user.phone' }),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, { name: `${record?.firstName} ${record?.lastName}`})}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteUser(record._id)}
            // onCancel={cancel}
            okText={intl.formatMessage({ id: 'common.button.ok' })}
            cancelText={intl.formatMessage({ id: 'common.button.cancel' })}
          >
            <Button type='link'>{intl.formatMessage({ id: 'common.button.delete' })}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.user' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.user' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/user/add')}>
            {intl.formatMessage({ id: 'user.button.addUser' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={users}
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

export default UserTable;
