import { Spin } from 'antd';
import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { useState, useEffect, useCallback } from 'react';
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
  const [productNames, setProductNames] = useState<string>('');

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_HOME,
      name: `${SETTINGS.BANNER_IMAGE}|${SETTINGS.PRODUCT_IDS}`,
    },
    pagination: {
      limit: 10,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const banner = templateData.data?.find((item: any) => item.name === SETTINGS.BANNER_IMAGE);
      const products = templateData.data?.find((item: any) => item.name === SETTINGS.PRODUCT_IDS);

      if (banner) {
        setBannerImage(banner?.valueImages?.[0]?.url as string);
      }

      if (products) {
        const searchKeys = JSON.parse(products.value).map((item: any) => item.label).join('|') as string;
        setProductNames(searchKeys)
      }
    }
  }, [isLoadingTemplateData, templateData]);

  const getProductList = useCallback((name: string) => {
    console.log('==== name', name);
    
    return <ProductList productNames={name}/>
  }, [])
  
  console.log('==== productNames', productNames);
  
  return (
    <>
      <Spin spinning={isLoadingTemplateData}>
        {bannerImage && !isLoadingTemplateData ? <Banner image={bannerImage} /> : <Banner image={defaultImage} />}
      </Spin>
      <Vision />
      <Information />
      {/* {templateData && !isLoadingTemplateData ? getProductList(productNames) : <ProductList productNames={''}/>} */}
      {/* {productNames && getProductList(productNames)} */}
      {productNames && <ProductList productNames={productNames}/>}
      <Projects />
      <PopupMenus />
      <Construction />
      <Faq />
    </>
  );
};

export default HomePagePc;
