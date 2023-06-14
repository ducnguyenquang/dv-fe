import { Button, Form, Input, Card, InputNumber, Switch } from 'antd';
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
// import Editor from 'app/components/Editor/CkEditorClassic';
import Editor from 'app/components/Editor/TinymceEditor';

import './ProjectDetailForm.less';
import { useNavigate } from 'react-router-dom';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
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

const ProjectDetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
  
  return (
    <div className="projectDetailForm">
      <Helmet title={intl.formatMessage({ id: 'page.name.projectDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.projectDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => navigate(`/admin/projects`)}>
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
              navigate(`/admin/projects`);
            });
          }}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'project.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'project.name' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input onChange={e => onNameChange(e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="slug"
            label={intl.formatMessage({ id: 'project.sku' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  { id: 'common.validation.require.field' },
                  { name: intl.formatMessage({ id: 'project.sku' }) }
                ),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item name="summary" label={intl.formatMessage({ id: 'project.summary' })}>
            <Input.TextArea showCount maxLength={100} value={initialValues?.summary} />
          </Form.Item>

          <Form.Item name="description" label={intl.formatMessage({ id: 'project.description' })}>
            <Editor value={description} onChange={setDescription} />
          </Form.Item>

          <Form.Item label={intl.formatMessage({ id: 'project.images' })}>
            <ImageUpload fileList={fileList} setFileList={setFileList} imageNumber={1} />
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
    </div>
  );
};

export default ProjectDetailForm;
