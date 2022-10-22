
import { AlertOutlined, ApiOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import './Distributor.less'

const Distributor = (): JSX.Element => {
  const intl = useIntl();

  return <div className='distributor'>
    <div className='title'>{intl.formatMessage({ id: 'dashboard.information.distributor.title' })}</div>
    <div className='content'>
      <a href='#'>
        <div className='item'>
          <div className='icon'><ApiOutlined /></div>
          <div className='text'>{intl.formatMessage({ id: 'dashboard.information.distributor.item1.title' })}</div>
        </div>
      </a>
      <a href='#'>
        <div className='item'>
          <div className='icon'><AlertOutlined /></div>
          <div className='text'>{intl.formatMessage({ id: 'dashboard.information.distributor.item2.title' })}</div>
        </div>
      </a>
    </div>
  </div>
}

export default Distributor;
