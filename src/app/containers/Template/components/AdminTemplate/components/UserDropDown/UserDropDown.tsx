import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import { useIntl } from 'react-intl';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './UserDropDown.less';
import { useEffect, useState } from 'react';
import { User } from 'models/user';
import { useNavigate, Link } from 'react-router-dom';

const UserDropDown = (): JSX.Element => {
  const intl = useIntl();
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Token')
    if (token) {
      const user = localStorage.getItem('CurrentUser')
      setCurrentUser(JSON.parse(user as string) as User);
    }
  }, []);

  const logout = () => {
    localStorage.setItem('Token', '');
    const url = window.location.href
    if (url.includes('/admin/')) {
      navigate('/admin/login', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }
  const menu = (
    <Menu
      items={[
        {
          label: <Link to={'#'}>{intl.formatMessage({ id: 'template.userDropDown.information' })}</Link>,
          key: '0',
          icon: <UserOutlined />,
        },
        {
          type: 'divider',
        },
        {
          label: <Button type='link' onClick={logout}>{intl.formatMessage({ id: 'template.userDropDown.logout' })}</Button>,
          key: '1',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div className='userContainer'>
      <Dropdown  className='userDropDown' overlay={menu} trigger={['click']}>
        <Button type='link' onClick={e => e.preventDefault()}>
          {currentUser ? <Space>
            {`${currentUser?.firstName} ${currentUser?.lastName}`}
            <Avatar src={currentUser?.images?.[0]?.url || currentUser?.images?.[0]?.thumbUrl || '/images/no-image.png' } />
          </Space> : intl.formatMessage({ id: 'template.userDropDown.login' })}
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserDropDown;
