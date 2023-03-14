import { Image } from "antd";
import { Helmet } from "react-helmet-async";
import { useIntl } from "react-intl";
import { ChangePasswordForm } from './components/ChangePasswordForm';
import './ChangePassword.less';
import { useCallback } from "react";
import { authenticationHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

const ChangePassword = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { mutateAsync: changePassword } = authenticationHooks.useChangePassword();

  const onFinish = useCallback( async (values: any) => {
    const currentUser = localStorage.getItem('CurrentUser')
    let user = currentUser ? JSON.parse(currentUser) : undefined
    
    if (user && user.temporaryToken) {
      localStorage.setItem('CurrentUser', '{}')
      user = await changePassword({
        email: user.email,
        password: values.password,
        oldPassword: user.temporaryToken,
      })
      localStorage.setItem('CurrentUser', JSON.stringify(user.data))
      localStorage.setItem('Token', user.token as string)
      navigate(`/admin`)
    }
  }, [changePassword, navigate])

  return <>
    <Helmet
        title={intl.formatMessage({ id: 'page.name.changePassword' })}
      />
      <div className="changePassword">
        <div className="bg-image">
          <img
            src={
              'https://cdn.elearningindustry.com/wp-content/uploads/2021/01/increase-sales-with-proven-elearning-elements.png'
            }
            alt={'Dai Viet'}
          />
        </div>
        <div className="form-container">
          <Image
            width={200}
            preview={false}
            src="/images/logodv-8769.gif"
          />
          <ChangePasswordForm onFinish={onFinish} />
        </div>
      </div>
  </>
}

export default ChangePassword;

