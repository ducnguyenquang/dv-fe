import { Dropdown, Menu, Space } from 'antd';
// import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './UserDropDown.less';

const UserDropDown = (): JSX.Element => {
  const intl = useIntl();

  const logout = () => {
    localStorage.setItem('Token', '');
    window.location.href = '/admin/login';
  }
  const menu = (
    <Menu
      items={[
        // {
        //   label: <a href="https://www.antgroup.com">
        //     {intl.formatMessage({ id: 'page.name.home' })}
        //   </a>,
        //   key: '0',
        // },
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
          <Space>
            Click me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default UserDropDown;
