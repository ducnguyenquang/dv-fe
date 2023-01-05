import Certs from './components/Certs/Certs';
import { Links } from './components/Links';
import { Logo } from './components/Logo';
import './TopMenu.less'

const TopMenu = (): JSX.Element => {
  return <div className="topMenu">
    <Logo />
    <Certs />
    <Links />
  </div>;
}
export default TopMenu;