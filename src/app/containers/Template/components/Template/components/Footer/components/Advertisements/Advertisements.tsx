// import { TopMenu } from './components/TopMenu';
// import { BottomFooter } from './components/BottomFooter';

import './Advertisements.less'
import { templatesHooks } from 'app/containers/Template';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Advertisement } from 'models/advertisement';

const Advertisements = (): JSX.Element => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

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

  const linkAdvertisement = (url: string) => {
    window.location.href = url;
  }
  
  return <div className="advertisements">
    {advertisements?.map((item: any) => <a href={item.url} key={item.name}><img
      // width={300}
      alt="logo"
      src={item?.image?.[0]?.thumbUrl || '/images/no-image.png'}
      onError={error => {
        error.currentTarget.src = '/images/no-image.png';
        error.currentTarget.onerror = null;
      }}
    /></a>)}
  </div>;
}
export default Advertisements;