import {
  Button,
  Form,
  Input,
  Card,
} from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
  // categories?: Category[];
}

const DetailForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const [text, setText] = useState("");
  const [form] = Form.useForm();
  const [body, setBody] = useState('');
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.popupMenuDetail' })} />
      <Card
        title={intl.formatMessage({ id: 'page.name.popupMenuDetail' })}
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
            label={intl.formatMessage({ id: 'setting.popupMenu.name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'setting.popupMenu.name' })}),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="icon"
            label={intl.formatMessage({ id: 'setting.popupMenu.icon' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'setting.popupMenu.icon' })}),
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label={intl.formatMessage({ id: 'setting.popupMenu.url' })}
          >
            <Input />
            {/* <Input.TextArea showCount maxLength={100} value={initialValues?.description} /> */}
            {/* <ReactQuill 
              // ref={editor}
              theme="snow" 
              value={body}
              // value={text} 

              onChange={setBody} 
              // onChange={(value) => setText(value)} 

              // modules={editorModules}
            /> */}
            {/* {reactElement} */}
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
