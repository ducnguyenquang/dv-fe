import { Button, Form, Input, Card, InputNumber, Switch, Select } from 'antd';
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
// import Editor from 'app/components/Editor/CkEditorClassic';
import Editor from 'app/components/Editor/TinymceEditor';

import './ContactDetailForm.less';
import { useNavigate } from 'react-router-dom';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { generateSku } from 'utils/string';
import { getCities, getWards } from 'utils/location/location';

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

const ContactDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [cities, setCities] = useState(getCities());
  const [wards, setWards] = useState<any[]>();

  useEffect(() => {
    if (initialValues?.images) setFileList(initialValues?.images)
  }, [initialValues?.images])

  const onNameChange = (value: string) => { 
    const id = generateSku(value)
    setSku(id);
  }

  useEffect(() => {
    if (sku) form.setFieldsValue({ slug: sku })
  }, [form, sku])

  const handleCityChange = (value: string) => {
    console.log(`selected ${value}`);
    setWards([]);
    // const code = value.split('-');
    setWards(getWards(value));
  };
  
  return (
    <div className="contactDetailForm">
      <Helmet title={intl.formatMessage({ id: 'page.name.contactDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.contactDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/contacts`)}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={async (values) => {
            await onFinish({
              ...values,
              description: encodeURIComponent(values.description),
              slug: encodeURIComponent(values.slug),
              images: fileList,
            })
            .then(() => {
              navigate(`/admin/contacts`);
            });
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'contact.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'contact.name' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input onChange={e => onNameChange(e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="phone"
            label={intl.formatMessage({ id: 'contact.phone' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'contact.phone' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['city']}
            label={intl.formatMessage({ id: 'contact.customer.city' })}
            rules={[{ required: true }]}
          >
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              onChange={handleCityChange}
            >
              {cities &&
                cities?.map((city: any) => {
                  return <Select.Option key={`${city.code}`}>{city.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name={['ward']}
            label={intl.formatMessage({ id: 'contact.customer.ward' })}
            rules={[{ required: true }]}
          >
            <Select
              // mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              // onChange={handleChange}
            >
              {wards &&
                wards?.map((ward: any) => {
                  return <Select.Option key={ward.name}>{ward.name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name={['address']}
            label={intl.formatMessage({ id: 'contact.customer.address' })}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'email'}
            label={intl.formatMessage({ id: 'contact.customer.email' })}
            rules={[{ type: 'email', required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label={intl.formatMessage({ id: 'contact.customer.content' })}>
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
    </div>
  );
};

export default ContactDetailForm;
