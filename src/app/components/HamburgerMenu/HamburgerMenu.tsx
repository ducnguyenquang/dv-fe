import { Menu, MenuProps } from 'antd';
import { slide as BurgerMenu } from 'react-burger-menu';
import { useIntl } from 'react-intl';
import './HamburgerMenu.less';
import { useNavigate } from 'react-router-dom';
import { templatesHooks } from 'app/containers/Template';
import { TopMenu } from 'models/topMenu';
import { useState, useEffect } from 'react';

const HamburgerMenu = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [topMenus, setTopMenus] = useState<MenuProps['items']>([]);

  const navMenuClick = (url: string) => {
    // navigate(url)
    navigate(url)
  };

  const { data: dataTopMenus, isLoading: isLoadingTopMenus } = templatesHooks.useTopMenus({
    pagination: {
      limit: 1000,
      offset: 0,
    },
    isHidden: false,
  });

  useEffect(() => {
    if (topMenus?.length === 0 && dataTopMenus && !isLoadingTopMenus) {
      setTopMenus(dataTopMenus?.map((item: TopMenu) => {
        return {
          key: item._id,
          label: item.name,
          onClick: () => navMenuClick(item.url as string)
        }
      }));
    }
  }, [dataTopMenus, isLoadingTopMenus, navMenuClick, topMenus?.length]);


  const defaultTopMenus: MenuProps['items'] = [
    {
      key: 'product',
      label: intl.formatMessage({ id: 'page.name.product' }),
      children: [
        {
          key: 'cap-dien',
          label: intl.formatMessage({ id: 'dashboard.information.distributor.item1.title' }),
          onClick: () => {
            navMenuClick('/electrical-cable');
          },
        },
        {
          key: 'den-led',
          label: intl.formatMessage({ id: 'dashboard.information.distributor.item2.title' }),
          onClick: () => {
            navMenuClick('/led-light');
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
        navMenuClick('/catalogues');
      },
    },
    {
      key: 'pricing',
      label: intl.formatMessage({ id: 'menu.top.pricing' }),
      onClick: () => {
        navMenuClick('/pricing' );
      },
    },
    {
      key: 'project',
      label: intl.formatMessage({ id: 'menu.top.project' }),
      onClick: () => {
        navMenuClick('/project' );
      },
    },
    {
      key: 'siteMap',
      label: intl.formatMessage({ id: 'menu.top.sitemap' }),
      onClick: () => {
        navMenuClick('/siteMap');
      },
    },
    {
      key: 'cart',
      label: intl.formatMessage({ id: 'menu.top.cart' }),
      onClick: () => {
        navMenuClick('/cart');
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
      <BurgerMenu>
        <Menu className="navMenu" mode="inline" defaultSelectedKeys={[...getNavSelected()]} items={topMenus || defaultTopMenus} />
      </BurgerMenu>
    </div>
  );
};

export default HamburgerMenu;
