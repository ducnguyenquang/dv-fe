import { Button, Form, Input, Card, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { useNavigate } from 'react-router-dom';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';

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
          <Form.Item label={intl.formatMessage({ id: 'common.image' })}>
            <ImageUpload fileList={fileList} setFileList={setFileList} imageNumber={1} />
          </Form.Item>
          <Form.Item name="url" label={intl.formatMessage({ id: 'setting.popupMenu.url' })}>
            <Input />
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
