import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Layout, Menu } from "antd";
// import { Header, Content } from "antd/lib/layout/layout";
// import Sider from "antd/lib/layout/Sider";
import React, { useState } from "react";
import { useIntl } from 'react-intl';
import './AdminTemplate.less';

interface IProps {
  // title?: string;
  content?: any;
}
const Template = ({ content }: IProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const intl = useIntl();

  const navMenuClick = (url: string) => {
    window.location.href = url
  }
  const { Header, Sider, Content } = Layout;

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['category']}
          items={[
            {
              key: 'category',
              icon: <UserOutlined />,
              label: intl.formatMessage({ id: 'menu.left.category' }),
              onClick: () => {
                navMenuClick('/admin/categories')
              }
            },
            {
              key: 'product',
              icon: <CodeSandboxOutlined />,
              label: intl.formatMessage({ id: 'menu.left.product' }),
              onClick: () => {
                navMenuClick('/admin/products')
              }
            },  
            {
              key: 'user',
              icon: <TeamOutlined />,
              label: intl.formatMessage({ id: 'menu.left.user' }),
              onClick: () => {
                navMenuClick('/admin/users')
              }
            },
            {
              key: 'order',
              icon: <SolutionOutlined />,
              label: intl.formatMessage({ id: 'menu.left.order' }),
              onClick: () => {
                navMenuClick('/admin/orders')
              }
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
                    navMenuClick('/admin/setting/common')
                  }
                },
                {
                  key: 'email',
                  label: intl.formatMessage({ id: 'menu.left.setting.email' }),
                },
                {
                  key: 'menuPopup',
                  label: intl.formatMessage({ id: 'menu.left.setting.menuPopup' }),
                },
                {
                  key: 'support',
                  label: intl.formatMessage({ id: 'menu.left.setting.support' }),
                },
                {
                  key: 'tagSeo',
                  label: intl.formatMessage({ id: 'menu.left.setting.tagSeo' }),
                },
              ]
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* <Card title={title}>
            {content}
          </Card> */}
          {content}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Template;
