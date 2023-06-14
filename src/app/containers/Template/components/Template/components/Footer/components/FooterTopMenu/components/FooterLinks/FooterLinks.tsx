import { Image } from 'antd';
import { templatesHooks } from 'app/containers/Template/hooks';
import { TopMenu } from 'models/topMenu';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
// import Certs from '../Certs/Certs';
import './FooterLinks.less';

const FooterLinks = (): JSX.Element => {
  const intl = useIntl();
  const [topMenus, setTopMenus] = useState([]);
  const navigate = useNavigate();

  const { data: dataTopMenus, isLoading: isLoadingTopMenus } = templatesHooks.useTopMenus({
    pagination: {
      limit: 20,
      offset: 0,
    },
    isHidden: false,
  });

  const navMenuClick = useCallback(
    (url: string) => {
      // navigate(url);
      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    if (topMenus?.length === 0 && dataTopMenus && !isLoadingTopMenus) {
      setTopMenus(
        dataTopMenus?.map((item: TopMenu) => {
          // const url = navMenuClick(item.url as string)
          // return <Link to={item.url}>{item.name}</Link>;
          return {
            key: item._id,
            label: item.name,
            onClick: () => navMenuClick(item.url as string),
            // style: {color: textColor},
          };
        })
      );
    }
  }, [dataTopMenus, isLoadingTopMenus, navMenuClick, topMenus?.length]);

  return (
    <div className="links">
      {/* <Certs /> */}
      {topMenus ? (
        topMenus.map((item: any) => {
          return (
            <a className="links-items" onClick={item.onClick}>
              {item.label}
            </a>
          );
        })
      ) : (
        <>
          <a className="links-items" href="/product">
            {intl.formatMessage({ id: 'template.footer.product' })}
          </a>
          <a className="links-items" href="/project">
            {intl.formatMessage({ id: 'template.footer.project' })}
          </a>
          <a className="links-items" href="/news">
            {intl.formatMessage({ id: 'template.footer.news' })}
          </a>
          <a className="links-items" href="/pricing">
            {intl.formatMessage({ id: 'template.footer.pricing' })}
          </a>
          <a className="links-items" href="/catalogues">
            {intl.formatMessage({ id: 'template.footer.catalogue' })}
          </a>
          <a className="links-items" href="/partner">
            {intl.formatMessage({ id: 'template.footer.partner' })}
          </a>
          <a className="links-items" href="/aboutUs">
            {intl.formatMessage({ id: 'template.footer.aboutUs' })}
          </a>
          <a className="links-items" href="/faq">
            {intl.formatMessage({ id: 'template.footer.faq' })}
          </a>
          <a className="links-items" href="/contact">
            {intl.formatMessage({ id: 'template.footer.contact' })}
          </a>
        </>
      )}
    </div>
  );
};
export default FooterLinks;
