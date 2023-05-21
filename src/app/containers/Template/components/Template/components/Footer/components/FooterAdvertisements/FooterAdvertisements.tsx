// import { TopMenu } from './components/TopMenu';
// import { BottomFooter } from './components/BottomFooter';

import './FooterAdvertisements.less'
import { templatesHooks } from 'app/containers/Template';
import { useEffect, useState } from 'react';
import { Advertisement } from 'models/advertisement';

import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { fixBrokenLink } from 'utils/string';

const FooterAdvertisements = (): JSX.Element => {
  // const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const { orientation, isMobile } = useContext(AppContext);

  const { data: advertisements, isLoading: isLoadingAdvertisements } = templatesHooks.useAdvertisements({
    pagination: {
      limit: 10,
      offset: 0,
    },
  });

  return <div className={`advertisements ${isMobile && 'advertisements-mobile'}`}>
    {advertisements && advertisements?.map((item: any) => <a href={fixBrokenLink(item.url) as unknown as string} key={item.name} target={'_blank'} rel="noreferrer"><img
      alt="logo"
      src={item?.image?.[0]?.url || item?.image?.[0]?.thumbUrl || '/images/no-image.png'}
      onError={error => {
        error.currentTarget.src = '/images/no-image.png';
        error.currentTarget.onerror = null;
      }}
    /></a>)}
  </div>;
}
export default FooterAdvertisements;