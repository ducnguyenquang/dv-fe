import { Button, Card, Form, Input } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from 'app/components/Editor/CkEditorClassic';
import { generateSku } from 'utils/string';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface IProps {
  isUpdate?: boolean;
  onFinish?: any;
  initialValues?: any;
  isLoading?: boolean;
}

const PageDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const [fileList, setFileList] = useState<UploadFile[]>(initialValues ? initialValues?.logo : []);
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');

  const onNameChange = (value: string) => {
    const id = generateSku(value)
    setSku(id);
  }

  useEffect(() => {
    if (sku) form.setFieldsValue({ slug: sku })
  }, [form, sku])
  
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'setting.page.name.pageDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'setting.page.name.pageDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/pages`)}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={async values => {
            await onFinish({
              ...values,
            }).then(() => navigate('/admin/setting/pages'));
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'setting.page.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.page.name' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input onChange={e => onNameChange(e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="slug"
            label={intl.formatMessage({ id: 'setting.page.slug' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.page.slug' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input onChange={e => onNameChange(e.target.value)}/>
          </Form.Item>

          <Form.Item
            name="description"
            label={intl.formatMessage({ id: 'setting.page.description' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.page.description' }) }
                ),
              },
            ]}
            hasFeedback
          >
            {/* <Input.TextArea showCount maxLength={100} value={initialValues?.description} /> */}
            <Editor value={description} onChange={setDescription} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isUpdate
                ? intl.formatMessage({ id: 'common.button.update' })
                : intl.formatMessage({ id: 'common.button.add' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default PageDetailForm;
