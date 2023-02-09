import { TopMenu } from './components/TopMenu';
import { BottomFooter } from './components/BottomFooter';
import { Advertisements } from './components/Advertisements';
import TawkTo from 'tawkto-react';
import './Footer.less'
import { useEffect } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';


const Footer = (): JSX.Element => {
  const { orientation, isMobile } = useContext(AppContext);

  useEffect(() => {
    const propertyId = '633be15054f06e12d8984ff1';
    const tawkId = '1gegug917';
    const tawk = new TawkTo(propertyId, tawkId);
    tawk.onStatusChange((status: any) => {
      console.log('==== TawkTo', status);
    });
  }, []);

  return <div className={`footer ${isMobile && 'footer-mobile'}`}>
    <Advertisements />
    <div className='menu'>
      <TopMenu />
      <BottomFooter />
    </div>
  </div>;
}
export default Footer;