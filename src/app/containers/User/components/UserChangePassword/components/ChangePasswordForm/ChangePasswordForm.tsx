import { Button, Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import './ChangePasswordForm.less';

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

const ChangePasswordForm = ({ isUpdate, onFinish, initialValues, isLoading }: IProps): JSX.Element => {
  const [form] = Form.useForm();
  const intl = useIntl();
  
  return (
    <div className="changePasswprd">
      <Helmet title={intl.formatMessage({ id: 'page.name.changePassword' })} />
      <h1 className="header">{intl.formatMessage({ id: 'page.name.changePassword' })}</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="update"
        onFinish={values =>
          onFinish({
            ...values,
            // images: fileList,
          })
        }
        initialValues={initialValues}
        scrollToFirstError
      >
        
        <Form.Item
          name="password"
          label={intl.formatMessage({ id: 'signup.password' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.password' }) }
              ),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={intl.formatMessage({ id: 'signup.confirmPassword' })}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                { id: 'common.validation.require.field' },
                { name: intl.formatMessage({ id: 'signup.password' }) }
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(intl.formatMessage({ id: 'signup.validation.invalid.confirmPassword' }))
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item shouldUpdate {...tailFormItemLayout}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={
                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0
              }
            >
              {intl.formatMessage({ id: 'common.button.apply' })}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
