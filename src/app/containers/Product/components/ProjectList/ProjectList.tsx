import { Divider, Skeleton, Segmented, Pagination } from 'antd';
import { useContext, useState } from 'react';
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import './ProjectList.less';
import { ListComponent } from './components';
// import { templatesHooks } from 'app/containers/Template';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Project } from 'models/project';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl, FormattedMessage } from 'react-intl';
// import { FilterApplied } from '../ProjectFilter/components/FilterApplied';
// import { useParams } from 'react-router-dom';
import { templatesHooks } from 'app/containers/Template';
import { Context as AppContext } from 'app/context/appContext';

const ProjectList = (): JSX.Element => {
  const [page, setPage] = useState(PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewType, setViewType] = useState('list');
  // const routeParams = useParams();
  const { isMobile } = useContext(AppContext);
  // const category = routeParams.category;
  const [search, setSearch] = useState<any>({
    isHidden: false,
  });
  // const [isLoadMoreData, setIsLoadMoreData] = useState(false);
  
  const [projectPagination, setProjectPagination] = useState<{
    totalCount?: number;
    offset?: number;
    hasNextPage?: boolean;
    limit?: number;
  }>({});
  const intl = useIntl();

  // const { data: categoryData, isLoading: isCategoryDataLoading } = templatesHooks.useCategories({
  //   search: {
  //     slug: category
  //   },
  //   pagination: {
  //     limit: 1,
  //     offset: 0,
  //   },
  // });

  // useEffect(() => {
  //   if (categoryData && !isCategoryDataLoading) {
  //     const categories = [categoryData?.data?.[0]?._id]
  //     setSearch({
  //       // ...search,
  //       categories,
  //     })
  //   }
  // },[categoryData, isCategoryDataLoading])
  
  const { data: projectData, isLoading: isProjectDataLoading } = templatesHooks.useProjects({
    search,
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });
  
  useEffect(() => {
    if (projectData && !isProjectDataLoading) {
      setProjects(projectData?.data);
      setProjectPagination(projectData?.pagination);
    }
  }, [isProjectDataLoading, projectData]);

  const loadMoreData = () => {
    
  };

  return (
    <div className={`projectList ${isMobile && 'projectList-mobile'}`}>
      {/* <FilterApplied /> */}
      {!isMobile && <div className="modeBlock">
        <div className="numberItem">
          <span>{projectPagination.totalCount}</span>
          <FormattedMessage id="common.filter.project" />
        </div>
        <Segmented
          className="modeFilter"
          onChange={value => setViewType(value as string)}
          options={[
            {
              label: intl.formatMessage({ id: 'common.button.filter.list' }),
              value: 'list',
              icon: <BarsOutlined />,
            },
            {
              label: intl.formatMessage({ id: 'common.button.filter.grid' }),
              value: 'grid',
              icon: <AppstoreOutlined />,
            },
          ]}
        />
      </div>}
      <div
        id="scrollableDiv"
        style={{
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={projects?.length}
          next={loadMoreData}
          hasMore={projectPagination && projectPagination?.hasNextPage ? projectPagination?.hasNextPage : false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain></Divider>}
          scrollableTarget="scrollableDiv"
          height={610}
          style={{ padding: '10px' }}
        >
          <ListComponent projects={projects} viewType={!isMobile ? viewType : 'grid'} />
        </InfiniteScroll>
      </div>
      {projects && projects.length > 0 && <Pagination
        className="pagination"
        total={projectData?.pagination?.totalCount || 10}
        showTotal={(total, range) => {
          return intl.formatMessage(
            { id: 'common.pagination.rangeData' },
            {
              start: range[0] || 1,
              end: range[1] || projectData?.pagination?.pageSize,
              total,
            }
          );
        }}
        defaultPageSize={projectData?.pagination?.pageSize}
        current={page}
        onChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        showSizeChanger
        onShowSizeChange={pageSize => {
          projectData?.pagination?.onShowSizeChange?.(pageSize);
        }}
      />}
    </div>
  );
};

export default ProjectList;
