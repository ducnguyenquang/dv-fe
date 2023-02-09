import Certs from './components/Certs/Certs';
import { Links } from './components/Links';
import { Logo } from './components/Logo';
import './TopMenu.less';
import { isMobile } from 'react-device-detect';

const TopMenu = (): JSX.Element => {
  return (
    <div className="topMenu">
      <Logo />
      <Certs />
      {!isMobile && (
        <>
          <Certs />
          <Links />
        </>
      )}
    </div>
  );
};
export default TopMenu;
