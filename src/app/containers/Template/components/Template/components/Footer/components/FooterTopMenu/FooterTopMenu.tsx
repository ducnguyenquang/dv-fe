import FooterCerts from './components/FooterCerts/FooterCerts';
import { FooterLinks } from './components/FooterLinks';
import { FooterLogo } from './components/FooterLogo';
import './FooterTopMenu.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

const FooterTopMenu = (): JSX.Element => {
  const { isMobile } = useContext(AppContext);

  return (
    <div className="topMenu">
      {!isMobile ? (
        <>
          <FooterLogo />
          <FooterCerts />
          <FooterLinks />
        </>
      ) : (
        <>
          <FooterLogo />
          <FooterCerts />
        </>
      )}
    </div>
  );
};
export default FooterTopMenu;
