
import { AlertOutlined, ApiOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import './Distributor.less'
import { isMobile } from 'react-device-detect';

const Distributor = (): JSX.Element => {
  const intl = useIntl();

  return <div className={`distributor ${isMobile && 'distributor-mobile'}`}>
    <div className='title'>{intl.formatMessage({ id: 'dashboard.information.distributor.title' })}</div>
    <div className='content'>
      <a href='/electrical-cable'>
        <div className='item'>
          <div className='icon'><img
            src={
              '/images/cable.png'
            }
            alt={'Dai Viet'}
          /></div>
          <div className='text'>{intl.formatMessage({ id: 'dashboard.information.distributor.item1.title' })}</div>
        </div>
      </a>
      <a href='/led-light'>
        <div className='item'>
          <div className='icon'><img
            src={
              '/images/led_lights.png'
            }
            alt={'Dai Viet'}
          /></div>
          <div className='text'>{intl.formatMessage({ id: 'dashboard.information.distributor.item2.title' })}</div>
        </div>
      </a>
    </div>
  </div>
}

export default Distributor;
