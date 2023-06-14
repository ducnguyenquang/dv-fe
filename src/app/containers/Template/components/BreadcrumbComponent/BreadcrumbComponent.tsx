import { Breadcrumb, Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const BreadcrumbComponent = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [pathName, setPathName] = useState(window.location.pathname);
  const [category, setCategory] = useState<{
    lable?: string;
    value?: string;
  }>();
  const [page, setPage] = useState('');

  const setBreadcrumbItems = useCallback((path: string) => {
    const pathNames = path.split('/');
    if (pathNames.length > 0) {
      if (pathNames[1]) {
        setCategory({ lable: intl.formatMessage({ id: `page.name.${pathNames[1]}` }), value: pathNames[1] });
      }
      if (pathNames[2]) {
        let pageName = pathNames[2];
        switch (pathNames[1]) {
          case 'project':
          case 'product':
            pageName = decodeURIComponent(decodeURI(pageName));
            break;
        }
        setPage(pageName);
      }
    }
  }, [intl]);

  useEffect(() => {
    if (pathName) {
      setBreadcrumbItems(pathName);
    }
  }, [pathName, setBreadcrumbItems]);

  const getNavigatePage = (url: string) => {
    let page = url
    switch (url) {
      case 'cap-dien':
        page = 'electrical-cable';
        break;
      case 'den-led':
        page = 'led-light';
        break;
      default:
        break;
    }

    navigate(`/${page}`);
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Button type="link" onClick={() => navigate(`/`)}>
            {intl.formatMessage({ id: 'page.name.home' })}
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Button type="link" onClick={() => navigate(`/${category?.value}`)}>
            {category?.lable}
          </Button>
        </Breadcrumb.Item>
        {page && (
          <Breadcrumb.Item>
            <Button type="link" onClick={() => getNavigatePage(page)}>
              {page}
            </Button>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbComponent;
