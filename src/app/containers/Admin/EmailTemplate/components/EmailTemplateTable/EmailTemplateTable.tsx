import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { emailTemplatesHooks, emailTemplatesActions, emailTemplatesApi } from 'app/containers/Admin/EmailTemplate';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { EmailTemplate } from 'models/emailTemplate';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

interface DataType {
  key: string;
  name: string;
  subject: string;
  body: string;
  _id: string;
}

const EmailTemplateTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const intl = useIntl();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = emailTemplatesHooks.useEmailTemplates({
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });

  const { mutateAsync: deleteEmailTemplate, isLoading: isLoadingDeleteEmailTemplate } = emailTemplatesHooks.useDeleteEmailTemplate();

  useEffect(() => {
    if (data && !isLoading) {
      // console.log('==== data.data 111', data);
      setEmailTemplates(data?.data);
    }
  }, [data, isLoading]);
  // console.log('==== data', data)

  // console.log('==== EmailTemplates', EmailTemplates);

  const getEmailTemplateDetail = async (row: DataType) => {
    await dispatch(emailTemplatesActions.setEmailTemplateDetail(row));
    window.location.href = `/admin/setting/emailTemplate/${row?._id}`;

    // dispatch(EmailTemplatesApi.setEquipmentPagination(pagination));
  };

  const onDeleteEmailTemplate = async (id: string) => {
    // console.log('==== onDeleteEmailTemplate id', id)
    await deleteEmailTemplate(id);
    setEmailTemplates([...emailTemplates]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'setting.emailTemplate.name' }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href="#" onClick={() => getEmailTemplateDetail(record)}>
          {record.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'setting.emailTemplate.subject' }),
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: intl.formatMessage({ id: 'setting.emailTemplate.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, {name: record?.name})}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteEmailTemplate(record?._id)}
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

  // console.log('==== emailTemplates', emailTemplates)

  return (
    <>
      <Helmet
        title={intl.formatMessage({ id: 'page.name.emailTemplate' })}
      />
      <Card
        title={intl.formatMessage({ id: 'page.name.emailTemplate' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/setting/emailTemplate/add')}>
            {intl.formatMessage({ id: 'setting.emailTemplate.button.addEmailTemplate' })}
          </Button>
        }
      >
        <ServiceTable
          columns={columns}
          dataSource={emailTemplates}
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

export default EmailTemplateTable;
