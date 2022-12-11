import { Image } from 'antd';
import './Banner.less'

interface IProps {
  image: string
}

const Banner = ({image} : IProps): JSX.Element => {
  return <div className='banner'>
    <Image preview={false} src={image} />
  </div>
}

export default Banner;
