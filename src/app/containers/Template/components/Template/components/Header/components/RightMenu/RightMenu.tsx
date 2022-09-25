import { Menu } from 'antd';
import { useIntl } from 'react-intl';
import './RightMenu.less';


const RightMenu = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className='rightMenu'>
      <Menu mode="horizontal">
        <Menu.Item key="product">
          {intl.formatMessage({ id: 'template.header.rightMenu.product' })}
        </Menu.Item>
        <Menu.Item key="consultant">
          {intl.formatMessage({ id: 'template.header.rightMenu.consultant' })}
        </Menu.Item>
        <Menu.Item key="catalogue">
          {intl.formatMessage({ id: 'template.header.rightMenu.catalogue' })}
        </Menu.Item>
        <Menu.Item key="pricing">
          {intl.formatMessage({ id: 'template.header.rightMenu.pricing' })}
        </Menu.Item>
        <Menu.Item key="project">
          {intl.formatMessage({ id: 'template.header.rightMenu.project' })}
        </Menu.Item>
        <Menu.Item key="partner">
          {intl.formatMessage({ id: 'template.header.rightMenu.partner' })}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default RightMenu;
