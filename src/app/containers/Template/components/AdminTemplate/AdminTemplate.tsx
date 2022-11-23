import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Layout, Menu, Image } from 'antd';
// import { Header, Content } from "antd/lib/layout/layout";
// import Sider from "antd/lib/layout/Sider";
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import './AdminTemplate.less';
import UserDropDown from './components/UserDropDown/UserDropDown';

interface IProps {
  content?: any;
}
const Template = ({ content }: IProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageName, setPageName] = useState('category');
  // const [inlineCollapsed, setInlineCollapsed] = useState(false);

  const intl = useIntl();

  const navMenuClick = ({ name, url }: { name: string; url: string }) => {
    setPageName(name);
    window.location.href = url;
  };

  useEffect(() => {
    if (window.location.pathname.includes('/admin/setting/')) {
      // setInlineCollapsed(true);
    }

    if (!localStorage.getItem('Token')) window.location.href = '/admin/login';
  }, []);

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
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <Image width={50} preview={false} src="/images/logodv-8769.gif" />
        <Menu
          mode="inline"
          defaultSelectedKeys={['category']}
          selectedKeys={[...getNavSelected()]}
          defaultOpenKeys={[...getSubNavSelected()]}
          items={[
            {
              key: 'category',
              icon: <UserOutlined />,
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
              icon: <SolutionOutlined />,
              label: intl.formatMessage({ id: 'menu.left.brand' }),
              onClick: () => {
                navMenuClick({ name: 'brand', url: '/admin/brands' });
              },
            },
            {
              key: 'advertisement',
              icon: <SolutionOutlined />,
              label: intl.formatMessage({ id: 'menu.left.advertisement' }),
              onClick: () => {
                navMenuClick({ name: 'advertisement', url: '/admin/advertisements' });
              },
            },
            {
              key: 'setting',
              icon: <SettingOutlined />,
              label: intl.formatMessage({ id: 'menu.left.setting' }),
              children: [
                {
                  key: 'common',
                  label: intl.formatMessage({ id: 'menu.left.setting.common' }),
                  onClick: () => {
                    navMenuClick({ name: 'common', url: '/admin/setting/information' });
                  },
                },
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
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })} */}
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
