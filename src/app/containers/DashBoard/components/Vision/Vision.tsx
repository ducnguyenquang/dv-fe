import {
  EyeOutlined,
  CarryOutOutlined,
  SketchOutlined,
} from '@ant-design/icons';
import './Vision.less'
import { useIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

const Vision = (): JSX.Element => {
  const intl = useIntl();
  const { orientation } = useContext(AppContext);

  return <div className={`visionBlog ${isMobile && 'visionBlog-mobile'} ${orientation && `visionBlog-mobile-${orientation}`}`}>
    
    <div className='item'>
      <div className='itemIcon'>
        <EyeOutlined />
      </div>
      <div className='itemInfo'>
        <div className='title'>{intl.formatMessage({ id: 'dashboard.vision.vision' })}</div>
        <div className='content'>{intl.formatMessage({ id: 'dashboard.vision.visionDetail' })}</div>
      </div>
    </div>
    <div className='item'>
      <div className='itemIcon'>
        <SketchOutlined />
      </div>
      <div className='itemInfo'>
        <div className='title'>{intl.formatMessage({ id: 'dashboard.vision.coreValue' })}</div>
        <div className='content'>{intl.formatMessage({ id: 'dashboard.vision.coreValueDetail' })}</div>
      </div>
    </div>
    <div className='item'>
      <div className='itemIcon'>
        <CarryOutOutlined />
      </div>
      <div className='itemInfo'>
        <div className='title'>{intl.formatMessage({ id: 'dashboard.vision.mission' })}</div>
        <div className='content'>{intl.formatMessage({ id: 'dashboard.vision.missionDetail' })}</div>
      </div>
    </div>
  </div>
}

export default Vision;
