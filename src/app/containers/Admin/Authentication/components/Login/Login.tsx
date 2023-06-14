import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Image, message, Layout } from 'antd';
import { LoginPayload, UserAuthentication, UserRole } from 'models/user';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { authenticationHooks } from '../../hooks';
import './Login.less';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { templatesHooks } from 'app/containers/Template';
import { RoleOptions } from 'constants/user';
import { Context as AppContext } from 'app/context/appContext';

const Login = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { data: settingTemplate } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_TEMPLATE,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { currentUser, token } = useContext(AppContext);

  // const { settingTemplate } = useContext(AppContext);
  const defaultValue = {
    email: '',
    password: '',
    role: RoleOptions.ADMIN,
  };

  const [loginData, setLoginData] = useState<LoginPayload>(defaultValue);

  // const [userLogin, setUserLogin] = useState<UserAuthentication>();

  const { data: userLogin, refetch } = authenticationHooks.useLogin(loginData);
  const onFinish = useCallback(async (values: any) => {
    setLoginData({
      ...values,
      role: RoleOptions.ADMIN,
    });
  }, []);

  useEffect(() => {
    if (loginData.email !== '' && loginData.password !== '') {
      refetch();
    }
  },[loginData, refetch])

  useEffect(() => {
    if (userLogin) {
      // localStorage.setItem('CurrentUser', JSON.stringify(userLogin));
      if (userLogin.token) {
        if (
          userLogin.role &&
          ((userLogin.role as string) === RoleOptions.ADMIN || (userLogin.role as string) === RoleOptions.SALE)
        ) {
          // localStorage.setItem('Token', userLogin.token as string);
          navigate(`/admin`);
        } else {
          message.error(intl.formatMessage({ id: 'common.user.login.fail' }));
        }
      } else {
        if (
          userLogin.role &&
          ((userLogin.role as string) === RoleOptions.ADMIN || (userLogin.role as string) === RoleOptions.SALE)
        ) {
          navigate(`/admin/changePassword`);
        } else {
          message.error(intl.formatMessage({ id: 'common.user.login.fail' }));
        }
      }
    }
    
    if (token) navigate(`/admin`);
  }, [intl, navigate, token, userLogin]);

  const logoIcon = useMemo(() => {
    if (settingTemplate) {
      return settingTemplate?.data?.find((item: any) => item.name === SETTINGS.LOGO);
    }
  }, [settingTemplate]);

  return (
    <Layout>
      <Helmet title={intl.formatMessage({ id: 'page.name.login' })} />
      <div className="signin-page">
        <div className="bg-image">
          <img src={'/images/increase-sales.jpg'} alt={'Dai Viet'} />
        </div>
        <div className="form-container">
          <Image
            className="logoIcon"
            preview={false}
            src={logoIcon?.valueImages?.[0]?.url || '/images/logodv-8769.gif'}
          />
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={intl.formatMessage({ id: 'login.username' })}
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={intl.formatMessage({ id: 'login.password' })}
              />
            </Form.Item>
            <Form.Item>
              <Link className="login-form-forgot" to="#">
                {intl.formatMessage({ id: 'login.link.forgetPassword' })}
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {intl.formatMessage({ id: 'login.button.submit' })}
              </Button>
              {intl.formatMessage({ id: 'login.text.let' })}{' '}
              <a href="./signup">{intl.formatMessage({ id: 'login.link.enroll' })}</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
