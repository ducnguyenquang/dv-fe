import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { settingsHooks, settingsActions, settingsApi } from 'app/containers/Admin/Setting';
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
  description: string;
  brand: string;
  sku: string;
  slug: string;
  categories: Category[];
  _id: string;
}

const EmailTemplateTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const intl = useIntl();

  const [page, setPage] = React.useState(PAGE);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE);
  const { data, isLoading } = settingsHooks.useEmailTemplates({
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });

  const { mutateAsync: deleteEmailTemplate, isLoading: isLoadingDeleteEmailTemplate } = settingsHooks.useDeleteEmailTemplate();

  useEffect(() => {
    if (data && !isLoading) {
      // console.log('==== data.data 111', data);
      setEmailTemplates(data?.data);
    }
  }, [data, isLoading]);
  // console.log('==== EmailTemplates', EmailTemplates);

  const getEmailTemplateDetail = async (row: DataType) => {
    await dispatch(settingsActions.setEmailTemplateDetail(row));
    window.location.href = `/admin/emailTemplate/${encodeURIComponent(row?._id)}`;

    // dispatch(EmailTemplatesApi.setEquipmentPagination(pagination));
  };

  const onDeleteEmailTemplate = async (id: string) => {
    await deleteEmailTemplate(id);
    setEmailTemplates([...emailTemplates]);
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'EmailTemplate.EmailTemplateName' }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href="#" onClick={() => getEmailTemplateDetail(record)}>
          {record.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'EmailTemplate.sku' }),
      dataIndex: 'slug',
      key: 'slug',
      render: (_, record) => (
        <>{decodeURIComponent(record.slug)}</>
      )
    },
    // {
    //   title: intl.formatMessage({ id: 'EmailTemplate.description' }),
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    {
      title: intl.formatMessage({ id: 'EmailTemplate.brand' }),
      dataIndex: 'brand',
      key: 'brand',
    },
    // {
    //   title: intl.formatMessage({ id: 'EmailTemplate.sku' }),
    //   dataIndex: 'sku',
    //   key: 'sku',
    // },
    {
      title: intl.formatMessage({ id: 'EmailTemplate.action' }),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmModal.title' }, {name: record?.name})}
            onVisibleChange={() => console.log('visible change')}
            onConfirm={() => onDeleteEmailTemplate(record._id)}
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

  return (
    <>
      <Helmet
        title={intl.formatMessage({ id: 'page.name.EmailTemplate' })}
      />
      <Card
        title={intl.formatMessage({ id: 'page.name.EmailTemplate' })}
        extra={
          <Button type="primary" htmlType="submit" onClick={() => (window.location.href = '/admin/EmailTemplate/add')}>
            {intl.formatMessage({ id: 'EmailTemplate.button.addEmailTemplate' })}
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
