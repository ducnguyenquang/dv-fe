import { useIntl } from 'react-intl';
import './BottomFooter.less'
import { ORIENTATION } from 'constants/common';

import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

const BottomFooter = (): JSX.Element => {
  const intl = useIntl();
  const { orientation, isMobile } = useContext(AppContext);

  return <div className={`bottomFooter ${isMobile && 'bottomFooter-mobile'}`}>
    <div className={`leftSide ${isMobile && orientation === ORIENTATION.PORTRAIT && 'displayNone'}`}>{intl.formatMessage({ id: 'template.footer.copyright' }, {year: new Date().getFullYear()})}</div>
    <div className='rightSide'>
      <div className='content'>
        <span>{intl.formatMessage({ id: 'template.footer.hotline' }, {phone: '+84 028.38428991'})}</span>
        <span>{intl.formatMessage({ id: 'template.footer.email' }, {email: 'capdaiviet@gmail.com'})}</span>
      </div>
    </div>
    
  </div>;
}
export default BottomFooter;