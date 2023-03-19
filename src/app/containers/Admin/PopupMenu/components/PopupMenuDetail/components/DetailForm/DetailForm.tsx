import { Button, Form, Input, Card, Upload, UploadFile, UploadProps, InputNumber, AutoComplete } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { useNavigate } from 'react-router-dom';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { settingsHooks } from 'app/containers/Admin/Setting';

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
  const intl = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>(initialValues ? initialValues?.images : []);

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
      <Helmet title={intl.formatMessage({ id: 'page.name.popupMenuDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.popupMenuDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/setting/popupMenu`)}>
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
              images: fileList,
            }).then(() => navigate(`/admin/setting/popupMenu`));
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'setting.popupMenu.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'setting.popupMenu.name' }) }
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="url" label={intl.formatMessage({ id: 'setting.popupMenu.url' })}>
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
          <Form.Item label={intl.formatMessage({ id: 'common.image' })}>
            <ImageUpload fileList={fileList} setFileList={setFileList} imageNumber={1} />
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
