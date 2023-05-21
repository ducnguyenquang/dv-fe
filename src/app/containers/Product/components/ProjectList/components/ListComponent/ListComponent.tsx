import { List } from 'antd';
import { Project } from 'models/project';
import { ListItemComponent } from '../ListItemComponent';
import { GridItemComponent } from '../GridItemComponent';
import './ListComponent.less';

interface IProps {
  projects: Project[];
  viewType: string;
}

const ListComponent = ({ projects, viewType }: IProps): JSX.Element => {
  const attributes = {
    grid: viewType === 'grid' ? {
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }: undefined,
  }
  return (
    <List
      className="projectList"
      itemLayout="vertical"
      size="large"
      dataSource={projects}
      renderItem={(item: Project) => {
        return viewType === 'list' ? <ListItemComponent key={item._id} data={item} /> : <GridItemComponent key={item._id} data={item} />
      }}
      {...attributes}
    />
  );
};

export default ListComponent;
