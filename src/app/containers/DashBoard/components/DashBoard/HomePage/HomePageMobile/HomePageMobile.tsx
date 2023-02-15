import { FooterLogo } from "app/containers/Template/components/Template/components/Footer/components/FooterTopMenu/components/FooterLogo";
import { Construction } from "../../../Construction";
import { Faq } from "../../../Faq";
import { Information } from "../../../Information";
import { Vision } from "../../../Vision";


const HomePageMobile = (): JSX.Element => {

  return (
    <>
      {/* <FooterLogo /> */}
      <Vision />
      <Information />
      <Construction />
      <Faq />
    </>
  );
};

export default HomePageMobile;
