import { Image } from 'antd';
import { useIntl } from 'react-intl';
import './History.less'
import { isMobile } from 'react-device-detect';

const History = (): JSX.Element => {
  const intl = useIntl();

  return <div className={`historyBlog ${isMobile && 'historyBlog-mobile'}`}>
    <div className='title'>{intl.formatMessage({ id: 'dashboard.information.history.title' })}</div>
    <div className='content'>{intl.formatMessage({ id: 'dashboard.information.history.content' })}</div>
  </div>
}

export default History;
