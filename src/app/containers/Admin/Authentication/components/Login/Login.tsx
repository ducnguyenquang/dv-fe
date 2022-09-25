import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button, Image } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import './Login.less';

const Login = (): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.login' })} />
      <div>{/*  {t(...messages.someThing)}  */}</div>
      <div className="signin-page">
        <div className="bg-image">
          <img
            src={
              'https://cdn.elearningindustry.com/wp-content/uploads/2021/01/increase-sales-with-proven-elearning-elements.png'
            }
            alt={'Dai Viet'}
          />
        </div>
        <div className="form-container">
          <Image width={200} preview={false} src="/images/logodv-8769.gif" />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={intl.formatMessage({ id: 'login.username' })} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder={intl.formatMessage({ id: 'login.password' })} />
            </Form.Item>
            <Form.Item>
              {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <a className="login-form-forgot" href="">
                {intl.formatMessage({ id: 'login.link.forgetPassword' })}
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {intl.formatMessage({ id: 'login.button.submit' })}
              </Button>
              {intl.formatMessage({ id: 'login.text.let' })} <a href="./signup">{intl.formatMessage({ id: 'login.link.enroll' })}</a>
            </Form.Item>
          </Form>
          {/* <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="loginForm"
          >
            <Form.Item
              label={intl.formatMessage({ id: 'login.username' })}
              name="username"
              rules={[{ required: true, message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'login.username' })}) }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({ id: 'login.password' })}
              name="password"
              rules={[{ required: true, message: intl.formatMessage({ id: 'common.validation.require.field' }, {name: intl.formatMessage({ id: 'login.password' })}) }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="forgetPassword" wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="link" >
                  {intl.formatMessage({ id: 'login.link.forgetPassword' })}
                </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {intl.formatMessage({ id: 'login.button.submit' })}
              </Button>
            </Form.Item>
          </Form> */}
        </div>
      </div>
    </>
  );
};

export default Login;
