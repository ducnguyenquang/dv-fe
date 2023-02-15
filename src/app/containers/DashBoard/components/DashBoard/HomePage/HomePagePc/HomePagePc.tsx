import { Banner } from "../../../Banner";
import { Construction } from "../../../Construction";
import { Faq } from "../../../Faq";
import { Information } from "../../../Information";
import { ProductList } from "../../../ProductList";
import { Projects } from "../../../Projects";
import { Vision } from "../../../Vision";


const HomePagePc = (): JSX.Element => {

  return (
    <>
      <Banner image="/images/banner_slider_1-9340.png" />
      <Vision />
      <Information />
      <ProductList />
      <Construction />
      <Faq />
      <Projects />
    </>
  );
};

export default HomePagePc;
