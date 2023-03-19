import { Empty, Spin } from 'antd';
import { Banner } from '../../Banner';
import './ElectricalCable.less';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Category } from 'models/category';
import Search from 'antd/lib/input/Search';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';
import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';

const ElectricalCable = (): JSX.Element => {
  const intl = useIntl();

  const { isMobile, orientation } = useContext(AppContext);

  const [name, setName] = useState('');
  const defaultBannerImage = '/images/eletrical-cable-banner.png';
  const [bannerImage, setBannerImage] = useState<string>(defaultBannerImage);

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_PRODUCT_CATEGORY,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });
  
  const { data: categories, isSuccess } = templatesHooks.useCategories({
    search: {
      type: 'cap-dien',
      name: name || undefined,
    },
    pagination: {
      limit: 100000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const banner = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_BANNER_IMAGE);

      if (banner) {
        setBannerImage(banner?.valueImages?.[0]?.url as string);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  const onSearch = (value: string) => setName(value);

  return (
    <div
      className={`electrical-cable ${isMobile && 'electrical-cable-mobile'} ${
        isMobile && orientation && `electrical-cable-mobile-${orientation}`
      }`}
    >
      {!isMobile && <Banner image={bannerImage} />}
      <h1 className="pageTitle">{intl.formatMessage({ id: 'dashboard.information.distributor.item1.title' })}</h1>
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

export default ElectricalCable;
