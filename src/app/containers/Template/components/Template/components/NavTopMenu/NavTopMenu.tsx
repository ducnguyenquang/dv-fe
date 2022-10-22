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
    },  {
        key: 'consult',
        label: intl.formatMessage({ id: 'menu.top.consult' }),
    },  {
        key: 'catalogues',
        label: intl.formatMessage({ id: 'menu.top.catalogues' }),
    },  
    {
        key: 'pricing',
        label: intl.formatMessage({ id: 'menu.top.pricing' }),
    },
    {
        key: 'project',
        label: intl.formatMessage({ id: 'menu.top.project' }),
    },
    {
        key: 'partner',
        label: intl.formatMessage({ id: 'menu.top.partner' }),
    },
    {
        key: 'policy',
        label: intl.formatMessage({ id: 'menu.top.policy' }),
    },
];

  return <Menu className="topMenu" mode="horizontal" defaultSelectedKeys={['product']} items={items1} />;
};

export default NavTopMenu;
