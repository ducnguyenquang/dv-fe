import { Image } from 'antd';
import { TrophyOutlined, SafetyCertificateOutlined, ShopOutlined, AlertOutlined, ApiOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import './Focusing.less';

const Focusing = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="focusingBlog">
      <div className="focusingItem">
        <div className='itemImage'>
          <Image width={600} height={400} preview={false} src="/images/cables.jpeg" />
        </div>
        <div className="itemBlog">
          <div className="item">
            <div className="itemIcon">
              <TrophyOutlined />
            </div>
            <div className="itemInfo">
              <div className="title">{intl.formatMessage({ id: 'dashboard.information.history.item1.title' })}</div>
              <div className="content">{intl.formatMessage({ id: 'dashboard.information.history.item1.content' })}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemIcon">
              <ShopOutlined />
            </div>
            <div className="itemInfo">
              <div className="title">{intl.formatMessage({ id: 'dashboard.information.history.item2.title' })}</div>
              <div className="content">{intl.formatMessage({ id: 'dashboard.information.history.item2.content' })}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="focusingItem">
        <div className="itemBlog">
          <div className="item">
            <div className="itemIcon">
              <AlertOutlined />
            </div>
            <div className="itemInfo">
              <div className="title">{intl.formatMessage({ id: 'dashboard.information.history.item3.title' })}</div>
              <div className="content">{intl.formatMessage({ id: 'dashboard.information.history.item3.content' })}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemIcon">
              <ApiOutlined />
            </div>
            <div className="itemInfo">
              <div className="title">{intl.formatMessage({ id: 'dashboard.information.history.item4.title' })}</div>
              <div className="content">{intl.formatMessage({ id: 'dashboard.information.history.item4.content' })}</div>
            </div>
          </div>
        </div>
        <div className='itemImage'>
          <Image width={600} height={400} preview={false} src="/images/led-garden-lights.jpeg" />
        </div>
      </div>
    </div>
  );
};

export default Focusing;
