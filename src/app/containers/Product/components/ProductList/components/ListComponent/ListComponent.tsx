import { List } from 'antd';
import { Product } from 'models/product';
import { ListItemComponent } from '../ListItemComponent';
import { GridItemComponent } from '../GridItemComponent';
import './ListComponent.less';

interface IProps {
  products: Product[];
  viewType: string;
}

const ListComponent = ({ products, viewType }: IProps): JSX.Element => {
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
      className="productList"
      itemLayout="vertical"
      size="large"
      dataSource={products}
      renderItem={(item: Product) => {
        return viewType === 'list' ? <ListItemComponent key={item._id} data={item} /> : <GridItemComponent key={item._id} data={item} />
      }}
      {...attributes}
    />
  );
};

export default ListComponent;
