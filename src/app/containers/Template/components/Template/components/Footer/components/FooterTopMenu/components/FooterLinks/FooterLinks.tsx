import { Image } from 'antd';
import { useIntl } from 'react-intl';
// import Certs from '../Certs/Certs';
import './FooterLinks.less'

const FooterLinks = (): JSX.Element => {
  const intl = useIntl();

  return <div className="links">
    {/* <Certs /> */}
    <div className='linkColumn'>
      <a href='/product'>{intl.formatMessage({ id: 'template.footer.product' })}</a>
      <a href='/project'>{intl.formatMessage({ id: 'template.footer.project' })}</a>
      <a href='/news'>{intl.formatMessage({ id: 'template.footer.news' })}</a>
    </div>
    <div className='linkColumn'>
      <a href='/pricing'>{intl.formatMessage({ id: 'template.footer.pricing' })}</a>
      <a href='/catalogues'>{intl.formatMessage({ id: 'template.footer.catalogue' })}</a>
      <a href='/partner'>{intl.formatMessage({ id: 'template.footer.partner' })}</a>
    </div>
    <div className='linkColumn'>
      <a href='/aboutUs'>{intl.formatMessage({ id: 'template.footer.aboutUs' })}</a>
      <a href='/faq'>{intl.formatMessage({ id: 'template.footer.faq' })}</a>
      <a href='/contact'>{intl.formatMessage({ id: 'template.footer.contact' })}</a>
    </div>
  </div>;
}
export default FooterLinks;