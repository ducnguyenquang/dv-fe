import { NavTopMenu } from "./components/NavTopMenu";
import './Header.less'

const Header = (): JSX.Element => {
  return <div className="header">
    <div className="nav">
      <NavTopMenu />
    </div>
  </div>;
}
export default Header;