import { Avatar, Dropdown, Menu, Space } from 'antd';
// import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './UserDropDown.less';
import { useEffect, useState } from 'react';
import { User } from 'models/user';

const UserDropDown = (): JSX.Element => {
  const intl = useIntl();
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    // if (!localStorage.getItem('Token')) window.location.href = '/admin/login';
    const token = localStorage.getItem('Token')
    if (token) {
      const user = localStorage.getItem('CurrentUser')
      setCurrentUser(JSON.parse(user as string) as User);
    }
  }, []);

  const logout = () => {
    localStorage.setItem('Token', '');
    window.location.href = '/admin/login';
  }
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
          label: <a onClick={logout}>{intl.formatMessage({ id: 'template.userDropDown.logout' })}</a>,
          key: '1',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div className='userContainer'>
      <Dropdown  className='userDropDown' overlay={menu} trigger={['click']}>
        <a onClick={e => e.preventDefault()}>
          {currentUser ? <Space>
            {`${currentUser?.firstName} ${currentUser?.lastName}`}
            <Avatar src={currentUser?.images?.[0]?.thumbUrl} />
          </Space> : intl.formatMessage({ id: 'template.userDropDown.login' })}
        </a>
      </Dropdown>
    </div>
  );
};

export default UserDropDown;
