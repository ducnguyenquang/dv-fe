import {
  UserOutlined,
  CodeSandboxOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  BankOutlined,
  AuditOutlined,
  FundOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image } from 'antd';
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import './AdminTemplate.less';
import UserDropDown from './components/UserDropDown/UserDropDown';
import { message } from 'antd';

import { Context as AppContext } from 'app/context/appContext';
import { useContext, useMemo } from 'react';
import { SETTINGS } from 'constants/common';
interface IProps {
  content?: any;
}
const Template = ({ content }: IProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageName, setPageName] = useState('category');
  const navigate = useNavigate();

  const intl = useIntl();

  const navMenuClick = ({ name, url }: { name: string; url: string }) => {
    setPageName(name);
    navigate(url)
  };

  const { settingTemplate } = useContext(AppContext);
  const logoIcon = useMemo(() => {
    if (settingTemplate) {
      return (settingTemplate as any)?.find((item: any) => item.name === SETTINGS.LOGO)
    }
  }, [settingTemplate])

  useEffect(() => {
    if (window.location.pathname.includes('/admin/setting/')) {
      // setInlineCollapsed(true);
    }

    if (!localStorage.getItem('Token')) {
      navigate('/admin/login')
      message.error(intl.formatMessage({ id: 'common.session.isTimeOut' }));
    };
  }, [intl, navigate]);

  const getNavSelected = () => {
    let result = 'category';
    switch (window.location.pathname) {
      case '/admin/categories':
      case '/admin/category/add':
      case '/admin/category/update':
        result = 'category';
        break;
      case '/admin/products':
      case '/admin/product/add':
      case '/admin/product/update':
        result = 'product';
        break;
      case '/admin/users':
      case '/admin/user/add':
      case '/admin/user/update':
        result = 'user';
        break;
      case '/admin/orders':
      case '/admin/order/add':
      case '/admin/order/update':
        result = 'order';
        break;
      case '/admin/setting/common':
        result = 'common';
        break;
      case '/admin/brands':
      case '/admin/brand/add':
      case '/admin/brand/update':
        result = 'brand';
        break;
      case '/admin/advertisements':
      case '/admin/advertisement/add':
      case '/admin/advertisement/update':
        result = 'advertisement';
        break;
      case '/admin/projects':
      case '/admin/projects/add':
      case '/admin/projects/update':
        result = 'project';
        break;
      case '/admin/setting/emailTemplate':
      case '/admin/setting/emailTemplate/add':
      case '/admin/setting/emailTemplate/update':
        result = 'emailTemplate';
        break;
      case '/admin/setting/popupMenu':
      case '/admin/setting/popupMenu/add':
      case '/admin/setting/popupMenu/update':
        result = 'popupMenu';
        break;
      case '/admin/setting/support':
      case '/admin/setting/support/add':
      case '/admin/setting/support/update':
        result = 'support';
        break;
      case '/admin/setting/tagSeos':
      case '/admin/setting/tagSeo/add':
      case '/admin/setting/tagSeo/update':
        result = 'tagSeo';
        break;
      case '/admin/setting/topMenus':
      case '/admin/setting/topMenu/add':
      case '/admin/setting/topMenu/update':
        result = 'topMenu';
        break;
      default:
        result = 'category';
        break;
    }
    return [result];
  };

  const getSubNavSelected = () => {
    let result = '';
    switch (window.location.pathname) {
      case '/admin/setting/common':
        result = 'setting';
        break;
      default:
        result = 'category';
        break;
    }
    return [result];
  };

  const { Header, Sider, Content } = Layout;

  return (
    <Layout className='adminTemplate'>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <Image className='adminTemplate-logo' preview={false} src={logoIcon?.valueImages?.[0]?.url || "/images/logodv-8769.gif"} />
        <Menu
          mode="inline"
          // defaultSelectedKeys={['category']}
          defaultSelectedKeys={[...getNavSelected()]}
          // selectedKeys={[...getNavSelected()]}
          defaultOpenKeys={[...getSubNavSelected()]}
          items={[
            {
              key: 'category',
              icon: <AppstoreAddOutlined />,
              label: intl.formatMessage({ id: 'menu.left.category' }),
              onClick: () => {
                navMenuClick({ name: 'category', url: '/admin/categories' });
              },
            },
            {
              key: 'product',
              icon: <CodeSandboxOutlined />,
              label: intl.formatMessage({ id: 'menu.left.product' }),
              onClick: () => {
                navMenuClick({ name: 'product', url: '/admin/products' });
              },
            },
            {
              key: 'user',
              icon: <TeamOutlined />,
              label: intl.formatMessage({ id: 'menu.left.user' }),
              onClick: () => {
                navMenuClick({ name: 'user', url: '/admin/users' });
              },
            },
            {
              key: 'order',
              icon: <SolutionOutlined />,
              label: intl.formatMessage({ id: 'menu.left.order' }),
              onClick: () => {
                navMenuClick({ name: 'order', url: '/admin/orders' });
              },
            },
            {
              key: 'brand',
              icon: <BankOutlined />,
              label: intl.formatMessage({ id: 'menu.left.brand' }),
              onClick: () => {
                navMenuClick({ name: 'brand', url: '/admin/brands' });
              },
            },
            {
              key: 'advertisement',
              icon: <FundOutlined />,
              label: intl.formatMessage({ id: 'menu.left.advertisement' }),
              onClick: () => {
                navMenuClick({ name: 'advertisement', url: '/admin/advertisements' });
              },
            },
            {
              key: 'project',
              icon: <AuditOutlined />,
              label: intl.formatMessage({ id: 'menu.left.project' }),
              onClick: () => {
                navMenuClick({ name: 'project', url: '/admin/projects' });
              },
            },
            {
              key: 'account',
              icon: <UserOutlined />,
              label: intl.formatMessage({ id: 'menu.left.setting.account' }),
              onClick: () => {
                navMenuClick({ name: 'common', url: '/admin/setting/information' });
              },
            },
            {
              key: 'setting',
              icon: <SettingOutlined />,
              label: intl.formatMessage({ id: 'menu.left.setting' }),
              children: [
                {
                  key: 'emailTemplate',
                  label: intl.formatMessage({ id: 'menu.left.setting.emailTemplate' }),
                  onClick: () => {
                    navMenuClick({ name: 'emailTemplate', url: '/admin/setting/emailTemplate' });
                  },
                },
                {
                  key: 'popupMenu',
                  label: intl.formatMessage({ id: 'menu.left.setting.menuPopup' }),
                  onClick: () => {
                    navMenuClick({ name: 'menuPopup', url: '/admin/setting/popupMenu' });
                  },
                },
                {
                  key: 'support',
                  label: intl.formatMessage({ id: 'menu.left.setting.support' }),
                  onClick: () => {
                    navMenuClick({ name: 'support', url: '/admin/setting/support' });
                  },
                },
                {
                  key: 'tagSeo',
                  label: intl.formatMessage({ id: 'menu.left.setting.tagSeo' }),
                  onClick: () => {
                    navMenuClick({ name: 'tagSeo', url: '/admin/setting/tagSeo' });
                  },
                },
                {
                  key: 'topMenu',
                  label: intl.formatMessage({ id: 'menu.left.setting.topMenu' }),
                  onClick: () => {
                    navMenuClick({ name: 'topMenu', url: '/admin/setting/topMenus' });
                  },
                },
                {
                  key: 'sku',
                  label: intl.formatMessage({ id: 'menu.left.setting.sku' }),
                  onClick: () => {
                    navMenuClick({ name: 'sku', url: '/admin/setting/sku' });
                  },
                },
                {
                  key: 'routePath',
                  label: intl.formatMessage({ id: 'menu.left.setting.routePath' }),
                  onClick: () => {
                    navMenuClick({ name: 'sku', url: '/admin/setting/routePath' });
                  },
                },
              ],
            },
            {
              key: 'settingPage',
              icon: <SettingOutlined />,
              label: intl.formatMessage({ id: 'menu.left.settingPage' }),
              // type: 'group',
              children: [
                {
                  key: 'template',
                  label: intl.formatMessage({ id: 'menu.left.settingPage.template' }),
                  onClick: () => {
                    navMenuClick({ name: 'template', url: '/admin/setting-page/template' });
                  },
                },
                {
                  key: 'home-page',
                  label: intl.formatMessage({ id: 'menu.left.settingPage.home-page' }),
                  onClick: () => {
                    navMenuClick({ name: 'home-page', url: '/admin/setting-page/home-page' });
                  },
                },
                {
                  key: 'product-category',
                  label: intl.formatMessage({ id: 'menu.left.settingPage.product-category' }),
                  onClick: () => {
                    navMenuClick({ name: 'product-category', url: '/admin/setting-page/product-category' });
                  },
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <UserDropDown />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Template;
