import { Links } from './components/Links';
import { Logo } from './components/Logo';
import './TopMenu.less'

const TopMenu = (): JSX.Element => {
  return <div className="topMenu">
    <Logo />
    <Links />
  </div>;
}
export default TopMenu;