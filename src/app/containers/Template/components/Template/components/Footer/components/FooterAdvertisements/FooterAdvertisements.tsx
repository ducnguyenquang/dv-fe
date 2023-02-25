// import { TopMenu } from './components/TopMenu';
// import { BottomFooter } from './components/BottomFooter';

import './FooterAdvertisements.less'
import { templatesHooks } from 'app/containers/Template';
import { useEffect, useState } from 'react';
import { Advertisement } from 'models/advertisement';

import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

const FooterAdvertisements = (): JSX.Element => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const { orientation, isMobile } = useContext(AppContext);

  const { data: dataAdvertisements, isLoading: isLoadingAdvertisements } = templatesHooks.useAdvertisements({
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (dataAdvertisements && !isLoadingAdvertisements) {
      setAdvertisements(dataAdvertisements);
    }
  }, [dataAdvertisements, isLoadingAdvertisements]);
  
  return <div className={`advertisements ${isMobile && 'advertisements-mobile'}`}>
    {advertisements?.map((item: any) => <a href={item.url} key={item.name}><img
      alt="logo"
      src={item?.image?.[0]?.thumbUrl || '/images/no-image.png'}
      onError={error => {
        error.currentTarget.src = '/images/no-image.png';
        error.currentTarget.onerror = null;
      }}
    /></a>)}
  </div>;
}
export default FooterAdvertisements;