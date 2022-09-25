import { Image } from 'antd';
import './Banner.less'

const Banner = (): JSX.Element => {
  return <div className='banner'>
    <Image preview={false} src="/images/banner_slider_1-9340.png" />
  </div>
}

export default Banner;
