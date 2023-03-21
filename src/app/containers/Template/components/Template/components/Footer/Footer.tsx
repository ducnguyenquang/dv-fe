import { FooterTopMenu } from './components/FooterTopMenu';
import { BottomFooter } from './components/BottomFooter';
import { FooterAdvertisements } from './components/FooterAdvertisements';
import TawkTo from 'tawkto-react';
import './Footer.less';
import { useEffect } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

interface IProps {
  hasAdvertisement?: boolean;
}

const Footer = ({ hasAdvertisement }: IProps): JSX.Element => {
  const { isMobile } = useContext(AppContext);

  useEffect(() => {
    const propertyId = '633be15054f06e12d8984ff1';
    const tawkId = '1gegug917';
    const tawk = new TawkTo(propertyId, tawkId);
    tawk.onStatusChange((status: any) => {
    });
  }, []);

  return (
    <div className={`footer ${isMobile && 'footer-mobile'}`}>
      {hasAdvertisement && <FooterAdvertisements />}
      <div className="menu">
        <FooterTopMenu />
        <BottomFooter />
      </div>
    </div>
  );
};
export default Footer;
