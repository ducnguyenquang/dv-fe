import './CategoryItem.less';
import { Category } from 'models/category';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  data?: Category;
}

const CategoryItem = ({ data }: IProps): JSX.Element => {
  const { isMobile, orientation } = useContext(AppContext);
  const navigate = useNavigate();

  const onItemClick = (name: string) => {
    const pathName = window.location.pathname
    navigate(`${pathName}/${name}/product`, { replace: true })
  }

  return (
    <div className={`category-item ${isMobile && 'category-item-mobile'} `} onClick={() => onItemClick(data?.slug as string)}>
      <div className="item-block">
        <div className="image">
          <img
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
