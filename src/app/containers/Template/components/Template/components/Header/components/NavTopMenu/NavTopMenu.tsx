import { Menu, MenuProps } from 'antd';
import { useIntl } from 'react-intl';
import { Logo } from '../Logo';
import { RightMenu } from '../RightMenu';
import './NavTopMenu.less';
interface IProps {
  content?: any;
}
const NavTopMenu = ({ content }: IProps): JSX.Element => {
  const intl = useIntl();
  const navMenuClick = ({ name, url }: { name: string; url: string }) => {
    window.location.href = url;
  };

  const getNavSelected = () => {
    let result = 'category';
    // return pageName;
    switch (window.location.pathname) {
      case '/product':
      case '/product/':
        result = 'product';
        break;
      case '/consulting':
      case '/consulting/':
        result = 'consulting';
        break;
      case '/catalogues':
      case '/catalogues/':
        result = 'catalogues';
        break;
      case '/pricing':
      case '/pricing/':
        result = 'pricing';
        break;
      case '/project':
      case '/project/':
        result = 'project';
        break;
      case '/sitemap':
      case '/sitemap/':
        result = 'sitemap';
        break;
      case '/cart':
      case '/cart/':
        result = 'cart';
        break;
      default:
        result = 'category';
        break;
    }
    return [result];
  };

  const items1: MenuProps['items'] = [
    {
      key: 'product',
      label: intl.formatMessage({ id: 'page.name.product' }),
      children: [
        {
          key: 'cap-dien',
          label: intl.formatMessage({ id: 'dashboard.information.distributor.item1.title' }),
          onClick: () => {
            navMenuClick({ name: 'product', url: '/electrical-cable' });
          },
        },
        {
          key: 'den-led',
          label: intl.formatMessage({ id: 'dashboard.information.distributor.item2.title' }),
          onClick: () => {
            navMenuClick({ name: 'product', url: '/led-light' });
          },
        },
      ],
    },
    // {
    //   key: 'consulting',
    //   label: intl.formatMessage({ id: 'menu.top.consult' }),
    //   onClick: () => {
    //     navMenuClick({ name: 'consulting', url: '/consulting' });
    //   },
    // },
    {
      key: 'catalogues',
      label: intl.formatMessage({ id: 'menu.top.catalogues' }),
      onClick: () => {
        navMenuClick({ name: 'catalogues', url: '/catalogues' });
      },
    },
    {
      key: 'pricing',
      label: intl.formatMessage({ id: 'menu.top.pricing' }),
      onClick: () => {
        navMenuClick({ name: 'pricing', url: '/pricing' });
      },
    },
    {
      key: 'project',
      label: intl.formatMessage({ id: 'menu.top.project' }),
      onClick: () => {
        navMenuClick({ name: 'project', url: '/project' });
      },
    },
    {
      key: 'siteMap',
      label: intl.formatMessage({ id: 'menu.top.sitemap' }),
      onClick: () => {
        navMenuClick({ name: 'siteMap', url: '/siteMap' });
      },
    },
    {
      key: 'cart',
      label: intl.formatMessage({ id: 'menu.top.cart' }),
      onClick: () => {
        navMenuClick({ name: 'cart', url: '/cart' });
      },
    },
  ];

  return <div className='navTopMenu'>
    {/* <div className='logo'><Logo /></div> */}
    <Logo />
    <Menu className="navMenu" mode="horizontal" defaultSelectedKeys={[...getNavSelected()]} items={items1} />
    <RightMenu />
  </div>
};

export default NavTopMenu;
