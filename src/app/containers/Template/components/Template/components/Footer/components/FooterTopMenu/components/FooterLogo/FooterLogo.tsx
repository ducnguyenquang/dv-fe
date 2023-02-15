import { Image } from 'antd';
import { useIntl } from 'react-intl';
import './FooterLogo.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

const FooterLogo = (): JSX.Element => {
  const intl = useIntl();
  const { isMobile } = useContext(AppContext);

  return <div className={`logo ${isMobile && 'logo-mobile'}`}>
    <a href='/'>
      <Image width={200} preview={false} src="/images/logo_text.png" />
      <div>{intl.formatMessage({ id: 'template.footer.slogun' })}</div>
    </a>
  </div>;
}
export default FooterLogo;