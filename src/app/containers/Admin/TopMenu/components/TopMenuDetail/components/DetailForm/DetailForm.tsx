import { Button, Form, Input, Card, Switch, InputNumber, AutoComplete } from 'antd';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { settingsHooks } from 'app/containers/Admin/Setting';
import { useState, useEffect } from 'react';
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
  isLoading: boolean;
}

const DetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [routePaths, setRoutePaths] = useState<{ value: string }[]>([]);
  const [routePathSearch, setRoutePathSearch] = useState<string>('');

  const { data: routePathData, isLoading: isRoutePathDataLoading } = settingsHooks.useRoutePaths({
    pagination: {
      limit: 1000,
      offset: 0,
    },
    search: routePathSearch,
    sort: {
      name: 'asc',
    },
  });

  useEffect(() => {
    if (routePathData && (!isLoading || !isRoutePathDataLoading)) {
      setRoutePaths(routePathData?.data);
    }
  }, [isLoading, isRoutePathDataLoading, routePathData]);

  const handleRoutePathSearch = (value: string) => {
    setRoutePathSearch(value);
  };

  const onRoutePathSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.topMenuDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.topMenuDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/setting/topMenus`)}>
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
            }).then(() => navigate(`/admin/setting/topMenus`));
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'setting.topMenu.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.topMenu.name' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label={intl.formatMessage({ id: 'setting.topMenu.url' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.topMenu.url' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <AutoComplete
              options={routePaths}
              style={{ width: 200 }}
              onSelect={onRoutePathSelect}
              onSearch={handleRoutePathSearch}
            >
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="order"
            label={intl.formatMessage({ id: 'setting.topMenu.order' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.topMenu.order' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <InputNumber defaultValue={initialValues?.order || 0} />
          </Form.Item>
          <Form.Item name="isHidden" label={intl.formatMessage({ id: 'product.isHidden' })}>
            <Switch defaultChecked={initialValues?.isHidden || false} />
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
