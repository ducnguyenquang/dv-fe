import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Card, Layout, Menu, MenuProps } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
// import { Header, Content } from "antd/lib/layout/layout";
// import Sider from "antd/lib/layout/Sider";
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { NavTopMenu } from './components/NavTopMenu';
import { Header as TemplateHeader } from './components/Header';

import './Template.less';

interface IProps {
  // title?: string;
  content?: any;
}
const Template = ({ content }: IProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const intl = useIntl();

  const navMenuClick = (url: string) => {
    window.location.href = url;
  };
  const { Header, Sider, Content } = Layout;

  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

  return (
    <Layout>
      <Header className="header">
        {/* <Menu className='topMenu' mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
        <TemplateHeader />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{content}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: '13px' }}>Copyright © {new Date().getFullYear()} Công ty Cổ phần chiếu sáng & Thiết bị điện Đại Việt. All rights reserved.</Footer>
    </Layout>
  );
};

export default Template;
