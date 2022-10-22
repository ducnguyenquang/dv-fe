import { Image } from 'antd';
import { useIntl } from 'react-intl';
import './Logo.less'

const Logo = (): JSX.Element => {
  const intl = useIntl();

  return <div className="logo">
    <a href='/'>
      <Image width={200} preview={false} src="/images/logo_text.png" />
      <div>{intl.formatMessage({ id: 'template.footer.slogun' })}</div>
    </a>
  </div>;
}
export default Logo;