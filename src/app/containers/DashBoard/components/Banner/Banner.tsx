import { Image } from 'antd';
import './Banner.less'
import { isMobile } from 'react-device-detect';

interface IProps {
  image: string
}

const Banner = ({image} : IProps): JSX.Element => {
  return <div className={`banner ${isMobile && 'banner-mobile'}`}>
    <Image preview={false} src={image} />
  </div>
}

export default Banner;
