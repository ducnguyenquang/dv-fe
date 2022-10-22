import { useIntl } from 'react-intl';
import './BottomFooter.less'

const BottomFooter = (): JSX.Element => {
  const intl = useIntl();

  return <div className="bottomFooter">
    <div className='leftSide'>{intl.formatMessage({ id: 'template.footer.copyright' }, {year: new Date().getFullYear()})}</div>
    <div className='rightSide'>
      <div className='content'>
        <span>{intl.formatMessage({ id: 'template.footer.hotline' }, {phone: '+84 028.38428991'})}</span>
        <span>{intl.formatMessage({ id: 'template.footer.email' }, {email: 'capdaiviet@gmail.com'})}</span>
      </div>
    </div>
    
  </div>;
}
export default BottomFooter;