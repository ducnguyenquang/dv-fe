import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { HomePageMobile } from './HomePageMobile';
import { HomePagePc } from './HomePagePc';

const HomePage = (): JSX.Element => {
  const { isMobile } = useContext(AppContext);

  return (
    <>
      {!isMobile ? (
        <HomePagePc />
      ) : (
        <HomePageMobile />
      )}
    </>
  );
};

export default HomePage;
