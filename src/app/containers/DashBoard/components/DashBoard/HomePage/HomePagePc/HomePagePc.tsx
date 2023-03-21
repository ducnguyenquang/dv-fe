import { Spin } from 'antd';
import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { useState, useEffect } from 'react';
// import { lazyLoad } from "utils/lazyLoad";
import { Banner } from '../../../Banner';
import { Construction } from '../../../Construction';
import { Faq } from '../../../Faq';
import { Information } from '../../../Information';
import { PopupMenus } from '../../../PopupMenus';
import { ProductList } from '../../../ProductList';
import { Projects } from '../../../Projects';
import { Vision } from '../../../Vision';

const HomePagePc = (): JSX.Element => {
  const defaultBannerImage = '/images/banner_slider_1-9340.png';
  const defaultImage = '/images/no-image.png';

  const [bannerImage, setBannerImage] = useState<string>();

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_HOME,
      name: SETTINGS.BANNER_IMAGE,
    },
    pagination: {
      limit: 1,
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
      <Spin spinning={isLoadingTemplateData}>
        {bannerImage && !isLoadingTemplateData ? <Banner image={bannerImage} /> : <Banner image={defaultImage} />}
      </Spin>
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
