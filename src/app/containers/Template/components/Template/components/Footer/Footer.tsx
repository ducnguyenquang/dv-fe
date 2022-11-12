import { TopMenu } from './components/TopMenu';
import { BottomFooter } from './components/BottomFooter';
import { Advertisements } from './components/Advertisements';
import TawkTo from 'tawkto-react';


import './Footer.less'
import { templatesHooks } from 'app/containers/Template';
import { useEffect } from 'react';

const Footer = (): JSX.Element => {
  useEffect(() => {
    const propertyId = '633be15054f06e12d8984ff1';
    const tawkId = '1gegug917';
    const tawk = new TawkTo(propertyId, tawkId);
    tawk.onStatusChange((status: any) => {
      console.log('==== TawkTo', status);
    });
  }, []);

  return <div className="footer">
    <Advertisements />
    <div className='menu'>
      <TopMenu />
      <BottomFooter />
    </div>
  </div>;
}
export default Footer;