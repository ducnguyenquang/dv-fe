import { Breadcrumb, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const BreadcrumbComponent = (): JSX.Element => {
  const intl = useIntl();

  const [pathName, setPathName] = useState(window.location.pathname);
  const [category, setCategory] = useState<{
    lable?: string;
    value?: string;
  }>();
  const [page, setPage] = useState('');

  const setBreadcrumbItems = (path: string) => {
    const pathNames = path.split('/');
    if (pathNames.length > 0) {
      if (pathNames[1]) {
        setCategory({ lable: intl.formatMessage({ id: `page.name.${pathNames[1]}` }), value: pathNames[1] });
      }
      if (pathNames[2]) {
        let pageName = pathNames[2];
        switch (pathNames[1]) {
          case 'product':
            pageName = decodeURIComponent(decodeURI(pageName));
            break;

          default:
            break;
        }
        setPage(pageName);
      }
    }
  };

  // setBreadcrumbItems(pathName)

  useEffect(() => {
    // console.log('==== pathName', pathName);
    if (pathName) {
      setBreadcrumbItems(pathName);
    }
  }, [pathName]);

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Button type="link" onClick={() => (window.location.href = `/`)}>
            {intl.formatMessage({ id: 'page.name.home' })}
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Button type="link" onClick={() => (window.location.href = `/${category?.value}`)}>
            {category?.lable}
          </Button>
        </Breadcrumb.Item>
        {page && (
          <Breadcrumb.Item>
            <Button type="link" onClick={() => (window.location.href = `/${category?.value}/${page}`)}>
              {page}
            </Button>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbComponent;
