import { NavTopMenu } from "./components/NavTopMenu";
import { Logo } from "./components/Logo";
import { RightMenu } from "./components/RightMenu";
import './Header.less'

const Header = (): JSX.Element => {
  return <div className="header">
    <div className="top">
      <Logo />
      <RightMenu />
    </div>
    <div className="nav">
      <NavTopMenu />
    </div>
  </div>;
}
export default Header;