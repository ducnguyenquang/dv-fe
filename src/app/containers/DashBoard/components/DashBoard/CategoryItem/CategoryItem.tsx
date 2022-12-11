import './CategoryItem.less';
import { Category } from 'models/category';

interface IProps {
  data?: Category;
}

const CategoryItem = ({ data }: IProps): JSX.Element => {
  const onItemClick = (name: string) => {
    const pathName = window.location.pathname
    window.location.href = `${pathName}/${name}`
  }

  return (
    <div className="category-item" onClick={() => onItemClick(data?.slug as string)}>
      <div className="item-block">
        <div className="image">
          <img
            width={300}
            alt="logo"
            src={data?.images?.[0]?.thumbUrl || '/images/no-image.png'}
            onError={error => {
              error.currentTarget.src = '/images/no-image.png';
              error.currentTarget.onerror = null;
            }}
          />
        </div>
        <div className="content">
          <div className="information">
            <div className="title">{data?.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
