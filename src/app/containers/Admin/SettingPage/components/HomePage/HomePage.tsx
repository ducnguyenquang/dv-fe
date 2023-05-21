import { Card, Button, UploadFile, Space } from 'antd';
// import Editor from 'app/components/Editor/CkEditorClassic';
import Editor from 'app/components/Editor/TinymceEditor';

import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { settingPagesHooks } from '../../hooks';
import { CableBlock } from './components/CableBlock';
import DistributorBlock from './components/DistributorBlock/DistributorBlock';
import FooterBlock from './components/FooterBlock/FooterBlock';
import { LedBlock } from './components/LedBlock';
import { ProductBlock } from './components/ProductBlock';
import './HomePage.less';

const HomePage = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_HOME,
  });

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { mutateAsync: updateCommon } = settingPagesHooks.useUpdateTemplate();
  const { mutateAsync: createCommon } = settingPagesHooks.useCreateTemplate();
  const { mutateAsync: deleteCommon } = settingPagesHooks.useDeleteTemplate();

  const [bannerImageItem, setBannerImageItem] = useState<Common>();
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);

  const [introductionItem, setIntroductionItem] = useState<Common>();
  const [introduction, setIntroduction] = useState<string>();

  const saveBannerImage = useCallback(async () => {
    if (bannerImageItem) {
      await updateCommon({
        ...bannerImageItem,
        valueImages: bannerFileList,
      });
    } else {
      await createCommon({
        name: SETTINGS.BANNER_IMAGE,
        valueImages: bannerFileList,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [bannerImageItem, createCommon, bannerFileList, updateCommon]);

  const saveIntroductionBlock = useCallback(async () => {
    if (introductionItem) {
      await updateCommon({
        ...introductionItem,
        value: introduction,
      });
    } else {
      await createCommon({
        name: SETTINGS.INTRODUCTION_BLOCK,
        value: introduction,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [createCommon, introduction, introductionItem, updateCommon]);

  const saveHomePage = async () => {
    await saveBannerImage();
    await saveIntroductionBlock();
  };

  const resetBannerImage = useCallback(async () => {
    if (bannerImageItem) {
      await deleteCommon(bannerImageItem._id);
      setBannerFileList([]);
    }
  }, [bannerImageItem, deleteCommon]);

  const resetIntroductionBlock = useCallback(async () => {
    if (introductionItem) {
      await deleteCommon(introductionItem._id);
      setIntroduction('');
    }
  }, [deleteCommon, introductionItem]);

  const resetHomePage = async () => {
    await resetBannerImage();
    await resetIntroductionBlock();
  };

  

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const banner = templateData.data?.find((item: any) => item.name === SETTINGS.BANNER_IMAGE);
      const intro = templateData.data?.find((item: any) => item.name === SETTINGS.INTRODUCTION_BLOCK);

      if (banner) {
        setBannerImageItem(banner);
        setBannerFileList(banner?.valueImages);
      }
      if (intro) {
        setIntroductionItem(intro);
        setIntroduction(intro?.value as string);
      }
      
    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <div className='settingHomePage'>
      <Helmet title={intl.formatMessage({ id: 'admin.settingPage.home-page.title-page' })} />
      <Card
        title={intl.formatMessage({ id: 'admin.settingPage.home-page.title-page' })}
        // extra={
        //   <Space direction="horizontal">
        //     <Button type="ghost" onClick={resetHomePage}>
        //       {intl.formatMessage({ id: 'common.button.revertAll' })}
        //     </Button>
        //     <Button type="primary" onClick={saveHomePage}>
        //       {intl.formatMessage({ id: 'common.button.updateAll' })}
        //     </Button>
        //   </Space>
        // }
      >
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.home-page.banner.name' })}
          extra={
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetBannerImage}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveBannerImage}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          }
        >
          <ImageUpload fileList={bannerFileList} ratio={4.5 / 1} setFileList={setBannerFileList} imageNumber={1} />
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.name' })}
          extra={
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetIntroductionBlock}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveIntroductionBlock}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          }
        >
          <Editor value={introduction} onChange={setIntroduction} />
        </Card>
        <CableBlock />
        <LedBlock />
        <DistributorBlock />
        <ProductBlock />
        <FooterBlock />
      </Card>
    </div>
  );
};

export default HomePage;
