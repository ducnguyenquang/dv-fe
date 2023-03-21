import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { pagesHooks } from '../../hooks';

const PageContent = (): JSX.Element => {
  const { id } = useParams();

  const { data: pageData, isLoading: isPageDataLoading } = pagesHooks.usePage({
    id,
  });

  return (
    <Spin wrapperClassName={`pageContent`} spinning={isPageDataLoading}>
      <div className="ck-content" dangerouslySetInnerHTML={{ __html: pageData?.description as string }}></div>
    </Spin>
  );
};

export default PageContent;
