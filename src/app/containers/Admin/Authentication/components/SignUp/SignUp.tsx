import { Form, Input, Checkbox, Button, Image } from "antd";
import { Helmet } from "react-helmet-async";
import { useIntl } from "react-intl";
import { UserDetailForm } from './components/UserDetailForm';
import './SignUp.less';

const SignUp = (): JSX.Element => {
  const intl = useIntl();

  return <>
    <Helmet
        title={intl.formatMessage({ id: 'page.name.login' })}
      />
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
          <Image
            width={200}
            preview={false}
            src="/images/logodv-8769.gif"
          />
          <UserDetailForm />
        </div>
      </div>
  </>
}

export default SignUp;
