import { Image } from 'antd';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { authenticationHooks } from '../../hooks';
import { UserDetailForm } from './components/UserDetailForm';
import './SignUp.less';

import { useMemo } from 'react';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';

const SignUp = (): JSX.Element => {
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

  const { mutateAsync: registerUser } = authenticationHooks.useRegister();
  const currentUser = localStorage.getItem('CurrentUser');

  const onFinish = useCallback(
    async (values: any) => {
      const user = await registerUser({
        ...values,
      });
      localStorage.setItem('CurrentUser', user);
      navigate(`/admin/login`);
    },
    [navigate, registerUser]
  );

  const logoIcon = useMemo(() => {
    if (settingTemplate) {
      return settingTemplate?.data?.find((item: any) => item.name === SETTINGS.LOGO);
    }
  }, [settingTemplate]);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'page.name.login' })} />
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
          <Image width={120} preview={false} src={logoIcon?.valueImages?.[0]?.url || '/images/logodv-8769.gif'} />
          <UserDetailForm onFinish={onFinish} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
