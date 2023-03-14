import { Empty, Spin } from 'antd';
import { Banner } from '../../Banner';
import './LedLight.less';
import { categoriesHooks } from 'app/containers/Admin/Category';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Category } from 'models/category';

import { Context as AppContext } from 'app/context/appContext';
import { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Search from 'antd/lib/input/Search';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';
import { PAGE_NAME, SETTINGS } from 'constants/common';

const LedLight = (): JSX.Element => {
  const intl = useIntl();

  const { isMobile, orientation } = useContext(AppContext);
  const [name, setName] = useState('');
  const defaultBannerImage = '/images/led-light-banner.png';
  const [bannerImage, setBannerImage] = useState<string>(defaultBannerImage);

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_PRODUCT_CATEGORY,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { data: categories, isSuccess } = categoriesHooks.useCategories({
    search: {
      type: 'den-led',
      name: name || undefined,

    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const banner = templateData.data?.find((item: any) => item.name === SETTINGS.LED_LIGHT_BANNER_IMAGE);

      if (banner) {
        setBannerImage(banner?.valueImages?.[0]?.url as string);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  const onSearch = (value: string) => setName(value);


  return (
    <div
      className={`led-light ${isMobile && 'led-light-mobile'} ${
        isMobile && orientation && `led-light-mobile-${orientation}`
      }`}
    >
      {!isMobile && <Banner image={bannerImage} />}
      <h1 className="pageTitle">{intl.formatMessage({ id: 'dashboard.information.distributor.item2.title' })}</h1>
      <Search
        className="search"
        addonBefore={intl.formatMessage({ id: 'common.search.title' })}
        placeholder={intl.formatMessage({ id: 'common.search.placeholder' })}
        onSearch={onSearch}
      />
      <Spin spinning={!isSuccess}>
        <div className="categories">
          {categories?.data && categories?.data.length > 0 ? (
            categories?.data?.map((item: Category) => <CategoryItem data={item} key={Math.random()} />)
          ) : (
            <Empty description={intl.formatMessage({ id: 'common.empty.data' })} />
          )}
        </div>
      </Spin>
    </div>
  );
};

export default LedLight;
