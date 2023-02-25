import { Image } from 'antd';
import './Logo.less';

const Logo = (): JSX.Element => {
  return <a href='/' className='logo'><Image preview={false} src="/images/logodv-8769.gif" /></a>
}

export default Logo;
