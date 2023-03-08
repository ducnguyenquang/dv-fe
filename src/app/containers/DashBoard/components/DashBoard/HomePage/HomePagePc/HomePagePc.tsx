import { settingPagesHooks } from "app/containers/Admin/SettingPage";
import { PAGE_NAME, SETTINGS } from "constants/common";
import { useState, useEffect } from "react";
// import { lazyLoad } from "utils/lazyLoad";
import { Banner } from "../../../Banner";
import { Construction } from "../../../Construction";
import { Faq } from "../../../Faq";
import { Information } from "../../../Information";
import { PopupMenus } from "../../../PopupMenus";
import { ProductList } from "../../../ProductList";
import { Projects } from "../../../Projects";
import { Vision } from "../../../Vision";

// const Banner = lazyLoad('../../../Banner', 'Banner');
// const Construction = lazyLoad('../../../Construction', 'Construction');
// const Faq = lazyLoad('../../../Faq', 'Faq');
// const Information = lazyLoad('../../../Information', 'Information');
// const PopupMenus = lazyLoad('../../../PopupMenus', 'PopupMenus');
// const ProductList = lazyLoad('../../../ProductList', 'ProductList');
// const Projects = lazyLoad('../../../Projects', 'Projects');
// const Vision = lazyLoad('../../../Vision', 'Vision');

const HomePagePc = (): JSX.Element => {

  const defaultBannerImage = '/images/banner_slider_1-9340.png';
  const [bannerImage, setBannerImage] = useState<string>(defaultBannerImage);

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_HOME,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const banner = templateData.data?.find((item: any) => item.name === SETTINGS.BANNER_IMAGE);
      if (banner) {
        setBannerImage(banner?.valueImages?.[0]?.url as string);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <>
      <Banner image={bannerImage} />
      <Vision />
      <Information />
      <ProductList />
      <Construction />
      <Faq />
      <Projects />
      <PopupMenus />
    </>
  );
};

export default HomePagePc;
