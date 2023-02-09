import { Banner } from '../../Banner';
import { Construction } from '../../Construction';
import { Faq } from '../../Faq';
import { Information } from '../../Information';
import { ProductList } from '../../ProductList';
import { Projects } from '../../Projects';
import { Vision } from '../../Vision';
// import { Template } from 'app/containers/Template';

const HomePage = (): JSX.Element => {
  return (
    <>
      <Banner image="/images/banner_slider_1-9340.png" />
      <Vision />
      <Information />
      <ProductList />
      <Construction />
      <Faq />
      <Projects />
      {/* <PopupMenus /> */}
    </>
  );
};

export default HomePage;
