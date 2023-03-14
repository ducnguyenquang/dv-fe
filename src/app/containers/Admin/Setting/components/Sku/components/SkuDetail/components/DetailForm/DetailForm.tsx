import { Button, Form, Input, Select, Card, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { brandsHooks } from 'app/containers/Admin/Brand';
import { Brand } from 'models/brand';

const { Option } = Select;
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

const DetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [body, setBody] = useState('');
  const intl = useIntl();
  const [brands, setBrands] = useState<Brand[]>([]);

  const { data: brandsData, isLoading: isLoadingBrandsData } = brandsHooks.useBrands({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (brandsData && !isLoadingBrandsData) {
      setBrands(brandsData.data);
    }
  }, [brandsData, isLoadingBrandsData]);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.skuDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.skuDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/setting/sku`)}>
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
            }).then(() => navigate(`/admin/setting/sku`));
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'setting.sku.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.sku.name' }) }
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label={intl.formatMessage({ id: 'setting.sku.value' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.sku.value' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label={intl.formatMessage({ id: 'product.brand' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'product.brand' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Select id="brand" allowClear placeholder={intl.formatMessage({ id: 'product.brand.placeholder' })}>
              {brands &&
                brands.map((item: any) => (
                  <Option key={item?._id} value={item?._id}>
                    {item?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="isHidden" label={intl.formatMessage({ id: 'setting.sku.isHidden' })}>
            <Switch defaultChecked={initialValues?.isHidden} />
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

export default DetailForm;
