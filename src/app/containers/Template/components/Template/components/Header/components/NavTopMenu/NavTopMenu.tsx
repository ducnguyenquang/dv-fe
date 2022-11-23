import React, { useEffect, useState } from 'react';

import { Menu, MenuProps } from 'antd';
import { useIntl } from 'react-intl';

interface IProps {
  content?: any;
}
const NavTopMenu = ({ content }: IProps): JSX.Element => {
  const intl = useIntl();

  const items1: MenuProps['items'] = [
    {
      key: 'product',
      label: intl.formatMessage({ id: 'page.name.product' }),
      onClick: () => {
        window.location.href = '/product';
      },
    },
    {
      key: 'consult',
      label: intl.formatMessage({ id: 'menu.top.consult' }),
      onClick: () => {
        window.location.href = '/consulting';
      },
    },
    {
      key: 'catalogues',
      label: intl.formatMessage({ id: 'menu.top.catalogues' }),
      onClick: () => {
        window.location.href = '/catalogues';
      },
    },
    {
      key: 'pricing',
      label: intl.formatMessage({ id: 'menu.top.pricing' }),
      onClick: () => {
        window.location.href = '/pricing';
      },
    },
    {
      key: 'project',
      label: intl.formatMessage({ id: 'menu.top.project' }),
      onClick: () => {
        window.location.href = '/project';
      },
    },
    {
      key: 'sitemap',
      label: intl.formatMessage({ id: 'menu.top.sitemap' }),
      onClick: () => {
        window.location.href = '/siteMap';
      },
    },
    {
      key: 'cart',
      label: intl.formatMessage({ id: 'menu.top.cart' }),
      onClick: () => {
        window.location.href = '/cart';
      },
    },
  ];

  return <Menu className="navMenu" mode="horizontal" defaultSelectedKeys={['product']} items={items1} />;
};

export default NavTopMenu;
