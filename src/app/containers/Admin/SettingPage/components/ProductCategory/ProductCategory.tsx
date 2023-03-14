import { Card, Button, UploadFile, Space } from 'antd';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { settingPagesHooks } from '../../hooks';
import './ProductCategory.less';

const ProductCategory = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_PRODUCT_CATEGORY,
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

  const [cableBannerImageItem, setCableBannerImageItem] = useState<Common>();
  const [cableFileList, setCableFileList] = useState<UploadFile[]>([]);
  const [ledLightBannerImageItem, setLedLightBannerImageItem] = useState<Common>();
  const [ledLightFileList, setLedLightFileList] = useState<UploadFile[]>([]);

  const saveCableBannerImage = useCallback(async () => {
    if (cableBannerImageItem) {
      await updateCommon({
        ...cableBannerImageItem,
        valueImages: cableFileList,
      });
    } else {
      await createCommon({
        name: SETTINGS.CABLE_BANNER_IMAGE,
        valueImages: cableFileList,
        group: PAGE_NAME.P_PRODUCT_CATEGORY,
      });
    }
  }, [cableBannerImageItem, createCommon, cableFileList, updateCommon]);

  const saveLedLightBannerImage = useCallback(async () => {
    if (ledLightBannerImageItem) {
      await updateCommon({
        ...ledLightBannerImageItem,
        valueImages: ledLightFileList,
      });
    } else {
      await createCommon({
        name: SETTINGS.LED_LIGHT_BANNER_IMAGE,
        valueImages: ledLightFileList,
        group: PAGE_NAME.P_PRODUCT_CATEGORY,
      });
    }
  }, [ledLightBannerImageItem, createCommon, ledLightFileList, updateCommon]);

  const saveProductCategory = async () => {
    await saveCableBannerImage();
    await saveLedLightBannerImage();
  };

  const resetCableBannerImage = useCallback(async () => {
    if (cableBannerImageItem) {
      await deleteCommon(cableBannerImageItem._id);
      setCableFileList([]);
    }
  }, [cableBannerImageItem, deleteCommon]);

  const resetLedLightBannerImage = useCallback(async () => {
    if (ledLightBannerImageItem) {
      await deleteCommon(ledLightBannerImageItem._id);
      setLedLightFileList([]);
    }
  }, [ledLightBannerImageItem, deleteCommon]);

  const resetProductCategory = async () => {
    await resetCableBannerImage();
    await resetLedLightBannerImage();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const cableBanner = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_BANNER_IMAGE);
      const ledLightBanner = templateData.data?.find((item: any) => item.name === SETTINGS.LED_LIGHT_BANNER_IMAGE);


      if (cableBanner) {
        setCableBannerImageItem(cableBanner);
        setCableFileList(cableBanner?.valueImages);
      }

      if (ledLightBanner) {
        setLedLightBannerImageItem(ledLightBanner);
        setLedLightFileList(ledLightBanner?.valueImages);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'admin.settingPage.product-category.title-page' })} />
      <Card
        title={intl.formatMessage({ id: 'admin.settingPage.product-category.title-page' })}
        extra={
          <Space direction="horizontal">
            <Button type="ghost" onClick={resetProductCategory}>
              {intl.formatMessage({ id: 'common.button.revertAll' })}
            </Button>
            <Button type="primary" onClick={saveProductCategory}>
              {intl.formatMessage({ id: 'common.button.updateAll' })}
            </Button>
          </Space>
        }
      >
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.product-category.cable.banner.name' })}
          extra={
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetCableBannerImage}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveCableBannerImage}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          }
        >
          <ImageUpload fileList={cableFileList} ratio={2 / 1} setFileList={setCableFileList} imageNumber={1} />
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.product-category.ledLight.banner.name' })}
          extra={
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetLedLightBannerImage}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveLedLightBannerImage}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          }
        >
          <ImageUpload fileList={ledLightFileList} ratio={2 / 1} setFileList={setLedLightFileList} imageNumber={1} />
        </Card>
      </Card>
    </>
  );
};

export default ProductCategory;
