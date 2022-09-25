import { Logo } from "./components/Logo";
import { RightMenu } from "./components/RightMenu";
import './Header.less'

const Header = (): JSX.Element => {
  return <div className="header">
    <Logo />
    <RightMenu />
  </div>;
}
export default Header;