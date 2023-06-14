import { Avatar, Badge, Button, Dropdown, Menu, Space, AutoComplete, Input } from 'antd';
import { useIntl } from 'react-intl';
import { LogoutOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import './UserDropDown.less';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User } from 'models/user';
import { useNavigate, Link } from 'react-router-dom';
import { Cart as CartModel } from 'models/cart';
import { useDispatch, useSelector } from 'react-redux';
import { Context as AppContext } from 'app/context/appContext';
import { authenticationActions, authenticationSelectors } from 'app/containers/Admin/Authentication';
import { RoleOptions } from 'constants/user';
import { templatesHooks } from 'app/containers/Template/hooks';

const UserDropDown = (): JSX.Element => {
  const intl = useIntl();
  const dispatch = useDispatch();

  // const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
  const [numberCartItems, setNumberCartItems] = useState<number>(0);
  const { currentUser, avatarUser } = useContext(AppContext);
  const cartStringData = localStorage.getItem('shoppingCart');
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<any>();
  const { refetch } = templatesHooks.useSearches({ search: { name: search, slug: search } });
  const url = window.location.href;


  useEffect(() => {
    // const cartStringData = localStorage.getItem('shoppingCart');
    if (cartStringData) {
      const cartData: CartModel = JSON.parse(cartStringData);
      let number = 0;
      cartData?.orderItems?.forEach(item => (number += item.quantity));

      setNumberCartItems(number || 0);
    } else {
      setNumberCartItems(0);
    }
  }, [cartStringData]);

  const onTextChangeSearch = useCallback((value: string) => {
    setSearch(value);
  }, [])

  const getSearchOptions = useCallback((data: any) => {
    return data.map((item: any) => {
     return {
       label: intl.formatMessage({ id: `page.name.${item.label}` }),
       options: item.options.map((o: any) => renderItem(item.label,  o))
     } 
    })
  }, []);


  const onSearch = useCallback(async () => {
    const result = await refetch();
    setOptions(getSearchOptions(result.data))
  }, [getSearchOptions, refetch]);

  const onLogout = () => {
    dispatch(authenticationActions.logout());
    if (url.includes('/admin')) {
      navigate('/admin/login');
    } else {
      navigate('/');
    }
  };

  const linkUserInformation = useMemo(() => {
    const isLinkToAdminPage = currentUser?.role === RoleOptions.CUSTOMER ? false : true;
    if (isLinkToAdminPage) {
      return '/admin/setting/information';
    } else {
      return '/information';
    }
  }, [currentUser?.role]);

  const onLinkToLoginPage = useCallback(() => {
    const url = window.location.href;

    if (url.includes('/admin')) {
      // navigate('/admin/login');
      window.location.href = '/admin/login';
    } else {
      //navigate('/user/login');
      window.location.href = '/user/login';
    }
  }, []);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to={linkUserInformation}>{intl.formatMessage({ id: 'template.userDropDown.information' })}</Link>
          ),
          key: '0',
          icon: <UserOutlined />,
        },
        {
          label: (
            <Badge dot={!!numberCartItems} offset={[10, 10]}>
              <Link to={'/cart'}>{intl.formatMessage({ id: 'cart.label' })}</Link>
            </Badge>
          ),
          key: '1',
          icon: <ShoppingOutlined />,
        },
        {
          type: 'divider',
        },
        {
          label: (
            <Button type="link" onClick={onLogout}>
              {intl.formatMessage({ id: 'template.userDropDown.logout' })}
            </Button>
          ),
          key: '2',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  const renderTitle = (title: string, url: string) => (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tìm hiểu
      </a>
    </span>
  );

  const onLinkToItemPage = (url: string) => {
    navigate(url)
  }

  const getItemPageUrl = (type:string, item: any) => {
    let url = '';
    switch (type) {
      case 'product':
        url = `${item.type}/${encodeURIComponent(item.slug)}`
        break;
      case 'project':
        url = `${encodeURIComponent(item.slug)}`
        break;
      default:
        break;
    }
    return url;
  }

  const renderItem = (type:string, data: any) => ({
    value: data.name,
    label: (
      <div
        className='searchOption'
        onClick={() => onLinkToItemPage(`/${type}/${getItemPageUrl(type, data)}`)}
        key={data._id}
      >
        {data.name}
        {/* <span>
          <UserOutlined /> {count}
        </span> */}
      </div>
    ),
  });

  // const defaultOptions = [
  //   {
  //     label: renderTitle('Sản phẩm', '/product'),
  //     options: [renderItem('AntDesign'), renderItem('AntDesign UI')],
  //   },
  //   {
  //     label: renderTitle('Dự án', '/projects'),
  //     options: [renderItem('AntDesign UI FAQ'), renderItem('AntDesign FAQ')],
  //   },
  // ];

  const [options, setOptions] = useState<any[]>();

  // const handleSearch = (value: string) => {
  //   // setOptions(
  //   //   !value ? [] : [{ value }, { value: value + value }, { value: value + value + value }],
  //   // );
  //   onSearch()
  // };

  const handleKeyPress = (ev: any) => {
    console.log('handleKeyPress', ev);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);

  };

  return (
    <div className="userContainer">
      <div className="userContainer-block">
        <div className="row">
          {!url.includes('/admin') && <span className="hotLine">
            {intl.formatMessage({ id: 'template.footer.hotline' }, { phone: '+84 028.38428991' })}
          </span>}
          {currentUser ? (
            <Dropdown className="userDropDown" overlay={menu} trigger={['click']}>
              <Button type="link" onClick={e => e.preventDefault()}>
                <Space>
                  <Badge dot={!!numberCartItems}>{`${currentUser?.firstName} ${currentUser?.lastName}`}</Badge>
                  <Avatar src={avatarUser?.[0]?.url || avatarUser?.[0]?.thumbUrl || '/images/no-image.png'} />
                </Space>
              </Button>
            </Dropdown>
          ) : (
            <Button type="link" onClick={onLinkToLoginPage}>
              {intl.formatMessage({ id: 'template.userDropDown.login' })}
            </Button>
          )}
        </div>
        {!url.includes('/admin') && <div className="rowSearch">
          <AutoComplete
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{ width: 250 }}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
          >
            <Input.Search size="large" placeholder="Tìm kiếm" onChange={(e) => onTextChangeSearch(e.target.value)} />
          </AutoComplete>
        </div>}
      </div>
    </div>
  );
};

export default UserDropDown;
