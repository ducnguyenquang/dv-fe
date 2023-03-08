import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Image } from 'antd';
import { LoginPayload } from 'models/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { authenticationHooks } from '../../hooks';
import './Login.less';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';

const Login = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { data: settingTemplate } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_TEMPLATE,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });


  // const { settingTemplate } = useContext(AppContext);

  const [loginData, setLoginData] = useState<LoginPayload>({
    email: '',
    password: '',
  });
  const { data: userLogin, isLoading: isLoadingUserLogin } = authenticationHooks.useLogin(loginData);
  const onFinish = useCallback(async (values: any) => {
    setLoginData(values);
  }, []);

  useEffect(() => {
    if (userLogin && !isLoadingUserLogin) {
      localStorage.setItem('CurrentUser', JSON.stringify(userLogin));
      if (userLogin.token) {
        localStorage.setItem('Token', userLogin.token as string);
        navigate(`/admin`, { replace: true });
      } else {
        navigate(`/admin/changePassword`, { replace: true });
      }
    }

    if (localStorage.getItem('Token')) navigate(`/admin`, { replace: true });
  }, [userLogin, isLoadingUserLogin, navigate]);

  const logoIcon = useMemo(() => {
    if (settingTemplate) {
      return settingTemplate?.data?.find((item: any) => item.name === SETTINGS.LOGO)
    }
  }, [settingTemplate])
  
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.login' })} />
      <div className="signin-page">
        <div className="bg-image">
          <img src={'/images/increase-sales.jpg'} alt={'Dai Viet'} />
        </div>
        <div className="form-container">
          <Image className='logoIcon' preview={false} src={logoIcon?.valueImages?.[0]?.url || "/images/logodv-8769.gif"} />
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
    </>
  );
};

export default Login;
