import { TopMenu } from './components/TopMenu';
import { BottomFooter } from './components/BottomFooter';

import './Footer.less'

const Footer = (): JSX.Element => {
  return <div className="footer">
    <TopMenu />
    <BottomFooter />
  </div>;
}
export default Footer;