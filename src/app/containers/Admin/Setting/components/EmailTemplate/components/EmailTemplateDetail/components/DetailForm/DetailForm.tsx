import {
  Button,
  Form,
  Input,
  Select,
  Card,
} from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  const [text, setText] = useState("");

  const [form] = Form.useForm();
  const [body, setBody] = useState('');
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.emailTempateDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.emailTempateDetail' })}
        extra={
          <Button type="ghost" htmlType="submit" onClick={() => (window.history.back())}>
            {intl.formatMessage({ id: 'common.button.back' })}
          </Button>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={(values) => onFinish({
            ...values,
          })}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'setting.emailTemplate.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'setting.emailTemplate.name' })}),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label={intl.formatMessage({ id: 'setting.emailTemplate.subject' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'setting.emailTemplate.subject' })}),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label={intl.formatMessage({ id: 'setting.emailTemplate.body' })}
          >
            <ReactQuill 
              theme="snow" 
              value={body}
              onChange={setBody} 
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isUpdate ? intl.formatMessage({ id: 'common.button.update' }) : intl.formatMessage({ id: 'common.button.add' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default DetailForm;