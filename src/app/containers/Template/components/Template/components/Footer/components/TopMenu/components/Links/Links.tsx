import { Image } from 'antd';
import { useIntl } from 'react-intl';
import './Links.less'

const Links = (): JSX.Element => {
  const intl = useIntl();

  return <div className="links">
    <div className='linkColumn'>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.product' })}</a>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.project' })}</a>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.news' })}</a>
    </div>
    <div className='linkColumn'>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.pricing' })}</a>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.catalogue' })}</a>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.partner' })}</a>
    </div>
    <div className='linkColumn'>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.aboutUs' })}</a>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.faq' })}</a>
      <a href='/'>{intl.formatMessage({ id: 'template.footer.contact' })}</a>
    </div>
  </div>;
}
export default Links;