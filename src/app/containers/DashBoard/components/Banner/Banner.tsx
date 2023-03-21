import { Image } from 'antd';
import './Banner.less'
import { isMobile } from 'react-device-detect';

interface IProps {
  image: string
}

const Banner = ({image} : IProps): JSX.Element => {
  const defaultImage = '/images/no-image.png';

  const loadDefaultImage = (error: any) => {
    error.target.src = defaultImage;
  };

  return <div className={`banner ${isMobile && 'banner-mobile'}`}>
    <Image preview={false} src={image} onError={loadDefaultImage}/>
  </div>
}

export default Banner;
