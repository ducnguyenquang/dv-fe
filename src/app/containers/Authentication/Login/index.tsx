/**
 *
 * SignIn
 *
 */

import * as React from 'react';
import './style.less';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { _t } from '../../../../utils/messages';

import { useSelector, useDispatch } from 'react-redux';

// import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { reducer, authActions, sliceKey } from '../slice';
// import { selectAuth } from '../selectors';
// import { authSaga } from '../saga';
// import { RoleSelect } from '../shared/components/RoleSelect';
// import { LoginForm } from '../shared/components/LoginForm';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { Link } from 'react-router-dom';
import { usersApi } from '../api';
import { LoginPayload } from 'models/user';
// import { TESTID } from '../../../../config/test';
// import { messages } from './messages';

// import { useHistory, useLocation } from 'react-router-dom';
// import { TUserRole } from '../types';

// import { messages } from './messages';
// import { useQuery } from 'utils/hooks/useQuery';
// import AppConfig from 'config/';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
// import { patientPaths } from 'routes/patient';

// const getDefaultRole = (pathname, queryRole): TUserRole | null => {
//   if (pathname === '/admin/sign-in') return 'ADMIN';

//   switch (queryRole) {
//     case 'patient':
//       return 'PATIENT';
//     case 'doctor':
//       return 'DOCTOR';
//     case 'admin':
//       return 'ADMIN';
//     default:
//       return null;
//   }
// };

interface Props {}

export function Login(props: Props) {
  // useInjectReducer({ key: sliceKey, reducer: reducer });
  // useInjectSaga({ key: sliceKey, saga: authSaga });
  // const location = useLocation();
  // const query = useQuery();
  // const redirectTo = query.get('redirect_to');
  // const queryAction = query.get('action');
  // const queryRole = query.get('role');
  // const action = queryAction ? `action=${queryAction}` : '';

  // /** REACT HOOKS **/
  // const [role, setRole] = React.useState<TUserRole | null>(null);

  // /** REDUX HOOKS **/
  // const { error, errorMsg, status, role: roleFromAuth } = useSelector(
  //   selectAuth,
  // );

  // /** ROUTER HOOKS **/
  // const history = useHistory();

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  // const token = localStorage.getItem('Token');

  // /** FUNCTIONS **/
  // const onLogin = user => {
  //   dispatch(authActions.getLoginStart({ ...user, role }));
  // };

  // const onSetRole = role => {
  //   setRole(role);
  // };

  // // Function for displaying message as notification
  // const openNotificationWithIcon = (title, error, type) => {
  //   notification.destroy();
  //   notification[type]({
  //     message: title,
  //     description: error,
  //   });
  // };

  // React.useEffect(() => {
  //   if (status === 'SIGNIN_FAIL') {
  //     switch (error) {
  //       case 'global.invalid.role':
  //         openNotificationWithIcon('Role is invalid', '', 'error');
  //         break;
  //       case 'global.invalid.password':
  //         break;
  //       default:
  //         openNotificationWithIcon(t('message.signInError'), errorMsg, 'error');
  //         break;
  //     }
  //   }
  // }, [error, errorMsg, status, dispatch, t]);

  // React.useEffect(() => {
  //   if (status === 'SIGNIN_SUCCESS' && role) {
  //     switch (role || roleFromAuth) {
  //       case 'ADMIN':
  //         history.replace(`/dashboard`);
  //         break;
  //       case 'PATIENT':
  //         history.replace(
  //           redirectTo && patientPaths.includes(redirectTo)
  //             ? `${redirectTo}?${action}`
  //             : '/dashboard/appointment',
  //         );
  //         break;
  //       case 'DOCTOR':
  //         history.replace('/dashboard/services');
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [status, role]);

  // React.useEffect(() => {
  //   setRole(getDefaultRole(location.pathname, queryRole));
  // }, [location.pathname, queryRole]);

  // React.useEffect(() => {
  //   if (!!token) {
  //     history.replace('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (!!token) {
  //   return null;
  // }
  const { t, i18n } = useTranslation();
  const onFinish = async (user: LoginPayload) => {
    await usersApi.login(user)
    // dispatch(authActions.getLoginStart({ ...user }));
  };
  // const { data, isLoading, isFetching } = productsHooks.useProducts({
  //   // ...debouncedFilters,
  //   pagination: {
  //     limit: 10,
  //     offset: 0,
  //   },
  //   // sort: sortBy[0],
  // });
  

  return (
    // <GoogleReCaptchaProvider
    //   reCaptchaKey={AppConfig.getRecaptchaKey()}
    //   useRecaptchaNet={true}
    //   useEnterprise={AppConfig.getEnv() === 'production'}
    //   scriptProps={{
    //     async: false, // optional, default to false,
    //     defer: false, // optional, default to false
    //     appendTo: 'head', // optional, default to "head", can be "head" or "body",
    //     nonce: undefined, // optional, default undefined
    //   }}
    // >
    <>
      <Helmet>
        {/* <title>{t(messages.title)}</title> */}
        <meta name="description" content="Description of Sign In" />
      </Helmet>
      <div>{/*  {t(...messages.someThing)}  */}</div>
      <div className="signin-page">
        <div className="bg-image">
          <img
            src={
              'https://so-public.s3.eu-central-1.amazonaws.com/605302bb69f957624bf276cd/attachment/0b245344-3c3f-4755-bd87-b2f47287b84a.jpeg'
            }
            alt={'Second Opinion'}
          />
        </div>
        <div className="form-container">
          {/* {role ? (
            <LoginForm
              role={role}
              onLogin={onLogin}
              selectAnotherRole={() =>
                setRole(role === 'DOCTOR' ? 'PATIENT' : 'DOCTOR')
              }
            />
          ) : (
            <RoleSelect type="SIGN_IN" setRole={onSetRole} />
          )} */}
          <Form
            name="login-form"
            size="large"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {/* <span className="form-title">
              {t(...messages.txtSignInAs)}{' '}
              <span className="role">{getRoleText(role).toUpperCase()}</span>
            </span> */}
            <Form.Item
              name="email"
              // rules={[
              //   { required: true, message: t(...messages.emailRequired) },
              //   { type: 'email', message: t(...messages.emailInvalid) },
              // ]}
              // validateStatus={passwordError.length > 0 ? 'error' : undefined}
              // help={passwordError || undefined}
            >
              <Input
                // role={TESTID.Login_InputEmail}
                // disabled={loading}
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t('login.email')}
              />
            </Form.Item>
            <Form.Item
              name="password"
              // rules={[{ required: true, message: t(...messages.passwordRequired) }]}
              // validateStatus={passwordError.length > 0 ? 'error' : undefined}
              // help={passwordError || undefined}
            >
              <Input.Password
                // role={TESTID.Login_InputPassword}
                // disabled={loading}
                // prefix={<LockOutlined className="site-form-item-icon" />}
                // iconRender={visible =>
                //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                // }
                placeholder={t('login.password')}
              />
            </Form.Item>
            <Form.Item>
              <Button
                // role={TESTID.Login_ButtonLogin}
                // loading={loading}
                // disabled={loading}
                type="primary"
                size="large"
                htmlType="submit"
                className="login-form-button"
              >
                {/* <FormattedMessage id="general.welcomeToSoniQ" /> */}
                Đăng nhập
              </Button>
            </Form.Item>
            {/* <Row
              style={{ width: '80%' }}
              justify={notAdmin ? 'space-between' : 'start'}
            >
              {notAdmin && (
                <Col className="not-member">
                  {t(...messages.txtNotAMember)}{' '}
                  <Link to="sign-up">
                    <Button
                      role={TESTID.Login_ButtonSignUp}
                      type="link"
                      className="signup"
                    >
                      {t(...messages.btnSignUp)}
                    </Button>
                  </Link>
                </Col>
              )}
              <Col>
                <Row
                  justify={notAdmin ? 'end' : 'start'}
                  align="middle"
                  style={{ height: '100%' }}
                >
                  <Link
                    role={TESTID.Login_ButtonForgotPassword}
                    className="forgot-password"
                    to={
                      notAdmin
                        ? '/forgot-password'
                        : `/forgot-password?role=${props.role?.toLowerCase()}`
                    }
                  >
                    {t(...messages.txtForgotPassword)}
                  </Link>
                </Row>
              </Col>
              {notAdmin && (
                <Col span={24}>
                  <Button
                    role={TESTID.Login_ButtonChangeRole}
                    type="link"
                    onClick={props.selectAnotherRole}
                  >
                    {t(...messages.txtSignInAnotherRole)}
                  </Button>
                </Col>
              )}
            </Row> */}
          </Form>
        </div>
      </div>
    </>
    // </GoogleReCaptchaProvider>
  );
}
