import { Avatar, Badge, Button, Dropdown, Menu, Space } from 'antd';
import { useIntl } from 'react-intl';
import { LogoutOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import './UserDropDown.less';
import { useEffect, useMemo, useState } from 'react';
import { User } from 'models/user';
import { useNavigate, Link } from 'react-router-dom';
import { Cart as CartModel } from 'models/cart';

const UserDropDown = (): JSX.Element => {
  const intl = useIntl();
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
  const [numberCartItems, setNumberCartItems] = useState<number>(0);

  // const [show, setShow] = useState(false);

  const token = localStorage.getItem('Token');
  const cartStringData = localStorage.getItem('shoppingCart');

  useEffect(() => {
    // const token = localStorage.getItem('Token');
    if (token) {
      const user = localStorage.getItem('CurrentUser');
      setCurrentUser(JSON.parse(user as string) as User);
    }
  }, [token]);

  useEffect(() => {
    // const cartStringData = localStorage.getItem('shoppingCart');
    if (cartStringData) {
      const cartData: CartModel = JSON.parse(cartStringData);
      // console.log('==== cartData', cartData);
      let number = 0
      cartData?.orderItems?.forEach(item =>
        number += item.quantity
      );
      
      setNumberCartItems(number || 0);
    } else {
      setNumberCartItems(0);
    }
  }, [cartStringData]);

  const logout = () => {
    localStorage.setItem('Token', '');
    const url = window.location.href;
    if (url.includes('/admin/')) {
      navigate('/admin/login');
    } else {
      navigate('/');
    }
  };
  const menu = (
    <Menu
      items={[
        {
          label: <Link to={'#'}>{intl.formatMessage({ id: 'template.userDropDown.information' })}</Link>,
          key: '0',
          icon: <UserOutlined />,
        },
        {
          label: <Badge dot={!!numberCartItems} offset={[10, 10]}><Link to={'/cart'}>{intl.formatMessage({ id: 'cart.label' })}</Link></Badge>,
          key: '1',
          icon: <ShoppingOutlined />,
        },
        {
          type: 'divider',
        },
        {
          label: (
            <Button type="link" onClick={logout}>
              {intl.formatMessage({ id: 'template.userDropDown.logout' })}
            </Button>
          ),
          key: '2',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div className="userContainer">
      <span className="hotLine">
        {intl.formatMessage({ id: 'template.footer.hotline' }, { phone: '+84 028.38428991' })}
      </span>
      <Dropdown className="userDropDown" overlay={menu} trigger={['click']}>
        <Button type="link" onClick={e => e.preventDefault()}>
          {currentUser ? (
            <Space>
              <Badge dot={!!numberCartItems}>{`${currentUser?.firstName} ${currentUser?.lastName}`}</Badge>
              <Avatar
                src={currentUser?.images?.[0]?.url || currentUser?.images?.[0]?.thumbUrl || '/images/no-image.png'}
              />
            </Space>
          ) : (
            intl.formatMessage({ id: 'template.userDropDown.login' })
          )}
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserDropDown;
