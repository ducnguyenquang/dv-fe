import { Menu, Input, Dropdown, Space } from 'antd';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import './RightMenu.less';
import UserDropDown from 'app/containers/Template/components/AdminTemplate/components/UserDropDown/UserDropDown';

const RightMenu = (): JSX.Element => {
  const intl = useIntl();

  const menu = (
    <Menu
      items={[
        {
          label: <a href="#">{intl.formatMessage({ id: 'template.userDropDown.information' })}</a>,
          key: '0',
          icon: <UserOutlined />,
        },
        {
          type: 'divider',
        },
        {
          label: <a>{intl.formatMessage({ id: 'template.userDropDown.logout' })}</a>,
          key: '1',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div className="rightMenu">
      <div className="userContainer">
        
        <UserDropDown />
      </div>
    </div>
  );
};

export default RightMenu;
