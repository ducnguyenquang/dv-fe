// import Logo from 'app/containers/Template/components/TemplateMobile/components/Footer/components/Logo/Logo';
// import Logo from 'app/containers/Template/components/TemplateMobile/components/Footer/components/TopMenu/components/Logo/Logo';
import { Menu } from 'antd';
import { slide as BurgerMenu } from 'react-burger-menu';
import { useIntl } from 'react-intl';
import './HamburgerMenu.less';
import { Layout } from 'antd';
import { useState } from 'react';

const HamburgerMenu = (): JSX.Element => {
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);

  const { Header, Sider, Content } = Layout;

  const navMenuClick = ({ name, url }: { name: string; url: string }) => {
    window.location.href = url;
  };

  const menu = [
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

  return (
    <div id="hamburgerMenu">
      {/* <Logo /> */}
      <BurgerMenu>
        {/* {menu.map(item => (
          <a id={item.key} className="menu-item" href="#" onClick={item.onClick}>
            {item.label}
          </a>
        ))} */}
        {/* <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a> */}

        <Menu className="navMenu" mode="inline" defaultSelectedKeys={[...getNavSelected()]} items={menu} />

      </BurgerMenu>
    </div>
  );
};

export default HamburgerMenu;
