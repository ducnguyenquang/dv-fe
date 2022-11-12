import { List } from 'antd';
import { useIntl } from 'react-intl';
import './SiteMap.less';

const SiteMap = (): JSX.Element => {
  const intl = useIntl();

  const data = [
    {
      name: intl.formatMessage({ id: 'page.name.home' }),
      url: '/',
    },
    {
      name: intl.formatMessage({ id: 'page.name.product' }),
      url: '/product',
    },
    {
      name: intl.formatMessage({ id: 'page.name.contact' }),
      url: '/contact',
    },
    {
      name: intl.formatMessage({ id: 'page.name.aboutUs' }),
      url: '/aboutUs',
    },
    {
      name: intl.formatMessage({ id: 'page.name.faq' }),
      url: '/faq',
    },
    {
      name: intl.formatMessage({ id: 'page.name.admin' }),
      url: '/admin',
    },
  ];

  return (
    <div className="siteMapBlock">
      <List
        header={<div>{intl.formatMessage({ id: 'page.name.siteMap' })}</div>}
        footer={null}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <a href={item.url}>{item.name}</a>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SiteMap;
