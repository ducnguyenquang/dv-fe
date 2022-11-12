import { Carousel } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { Project } from 'models/project';
import { useIntl } from 'react-intl';
import { ProjectItem } from './components/ProjectItem';
import './Projects.less';

const Projects = (): JSX.Element => {
  const intl = useIntl();

  // const { data: products, isLoading } = productsHooks.useProducts({
  //   pagination: {
  //     limit: 5,
  //     offset: 0,
  //   },
  // });

  const products: {
    data: Project[]
  } = {data: [
    {
      name: 'Dự án căn hô Himlam',
      summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led',
      description: '',
      images: '/images/himlam-3-4482.jpeg',
    },
    {
      name: 'Dự án căn hộ Sky center',
      summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
      description: '',
      images: '/images/sky-center-3-5635.png',
    },
    {
      name: 'Dự án căn hộ Mysterry',
      summary: 'Cung cấp giải pháp ánh sáng dùng công nghệ Led, đèn sân vườn, đèn led trang trí, cáp điện, ....',
      description: '',
      images: '/images/mysterry-1-1345.jpeg',
    }
  ]}

  return (
    <div className="product">
      <div className="header">{intl.formatMessage({ id: 'dashboard.project.title' })}</div>
      <div className="summary">{intl.formatMessage({ id: 'dashboard.project.content' })}</div>

      <div className="productBlock">
        {products?.data?.map((data: Project) => {
          return <ProjectItem data={data} />;
        })}
      </div>
    </div>
  );
};

export default Projects;
