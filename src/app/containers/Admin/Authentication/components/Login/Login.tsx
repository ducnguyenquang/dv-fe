import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button, Image } from 'antd';
import { LoginPayload } from 'models/user';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { authenticationHooks } from '../../hooks';
import './Login.less';

const Login = (): JSX.Element => {
  const intl = useIntl();
  const [loginData, setLoginData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  // const onFinish = () => {
  //   const { data: brandDetailData, isLoading: isLoadingBrandDetailData } = authenticationHooks.useLogin({ id });

  // }

  console.log('==== loginData', loginData); //return;
  const { data: userLogin, isLoading: isLoadingUserLogin } = authenticationHooks.useLogin(loginData);
  console.log('==== userLogin', userLogin); //return;


  const onFinish = useCallback(
    async (values: any) => {
      // console.log('==== values', values); return;
      setLoginData(values);
    },
    []
  );

  useEffect(() => {
    if (userLogin && !isLoadingUserLogin) {
      // console.log('==== userLogin', userLogin); return;
      localStorage.setItem('Token', userLogin.token as string)
      window.location.href = `/admin`;
    }

    if (localStorage.getItem('Token')) window.location.href = '/admin/';
  }, [userLogin, isLoadingUserLogin]);


  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.login' })} />
      <div>{/*  {t(...messages.someThing)}  */}</div>
      <div className="signin-page">
        <div className="bg-image">
          <img
            src={
              '/images/increase-sales.jpg'
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
            onFinish={onFinish}
          >
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your Username!' }]}>
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
        </div>
      </div>
    </>
  );
};

export default Login;
