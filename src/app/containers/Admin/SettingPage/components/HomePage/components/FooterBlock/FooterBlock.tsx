import { Card, Space, Button, UploadFile, Input } from 'antd';
// import Editor from 'app/components/Editor/CkEditorClassic';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage/hooks';
import { MODULE_NAME, PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './FooterBlock.less';

const FooterBlock = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_HOME,
    // type: `${MODULE_NAME.M_LED_BLOCK}|${MODULE_NAME.M_CABLE_BLOCK}`,
    type: MODULE_NAME.M_FOOTER_BLOCK,
  });

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search,
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { mutateAsync: updateCommons } = settingPagesHooks.useUpdateTemplates();
  const { mutateAsync: createCommons } = settingPagesHooks.useCreateTemplates();
  const { mutateAsync: deleteCommon } = settingPagesHooks.useDeleteTemplate();

  const [updateItems, setUpdateItems] = useState<Common[]>([]);
  const [createItems, setCreateItems] = useState<Common[]>([]);

  const [logoImageItem, setLogoImageItem] = useState<Common>();
  const [logoImageFileList, setLogoImageFileList] = useState<UploadFile[]>([]);
  const [sologunItem, setSologunItem] = useState<Common>();
  const [sologun, setSologun] = useState<string>();

  const [standardImage1Item, setStandardImage1Item] = useState<Common>();
  const [standardImage1FileList, setStandardImage1FileList] = useState<UploadFile[]>([]);
  const [standardImage2Item, setStandardImage2Item] = useState<Common>();
  const [standardImage2FileList, setStandardImage2FileList] = useState<UploadFile[]>([]);
  const [standardImage3Item, setStandardImage3Item] = useState<Common>();
  const [standardImage3FileList, setStandardImage3FileList] = useState<UploadFile[]>([]);

  const saveLogoImageItem = useCallback(async () => {
    if (logoImageFileList !== undefined) {
      if (logoImageItem) {
        if (logoImageFileList !== logoImageItem.valueImages) {
          updateItems.push({
            ...logoImageItem,
            type: MODULE_NAME.M_FOOTER_BLOCK,
            valueImages: logoImageFileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.FOOTER_LOGO,
          valueImages: logoImageFileList,
          type: MODULE_NAME.M_FOOTER_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [logoImageFileList, logoImageItem, updateItems, createItems]);

  const saveSologun = useCallback(async () => {
    if (sologun !== undefined) {
      if (sologunItem) {
        if (sologun !== sologunItem.value) {
          updateItems.push({
            ...sologunItem,
            type: MODULE_NAME.M_FOOTER_BLOCK,
            value: sologun,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.FOOTER_SOLOGUN,
          value: sologun,
          type: MODULE_NAME.M_FOOTER_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [sologun, sologunItem, updateItems, createItems]);

  const saveStandardImage1Item = useCallback(async () => {
    if (standardImage1FileList !== undefined) {
      if (standardImage1Item) {
        if (standardImage1FileList !== standardImage1Item.valueImages) {
          updateItems.push({
            ...standardImage1Item,
            type: MODULE_NAME.M_FOOTER_BLOCK,
            valueImages: standardImage1FileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.FOOTER_STANDARD_IMAGE_1,
          valueImages: standardImage1FileList,
          type: MODULE_NAME.M_FOOTER_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [standardImage1FileList, standardImage1Item, updateItems, createItems]);

  const saveStandardImage2 = useCallback(async () => {
    if (standardImage2FileList !== undefined) {
      if (standardImage2Item) {
        if (standardImage2FileList !== standardImage2Item.valueImages) {
          updateItems.push({
            ...standardImage2Item,
            type: MODULE_NAME.M_FOOTER_BLOCK,
            valueImages: standardImage2FileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.FOOTER_STANDARD_IMAGE_2,
          valueImages: standardImage2FileList,
          type: MODULE_NAME.M_FOOTER_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [standardImage2FileList, standardImage2Item, updateItems, createItems]);

  const saveStandardImage3 = useCallback(async () => {
    if (standardImage3FileList !== undefined) {
      if (standardImage3Item) {
        if (standardImage3FileList !== standardImage3Item.valueImages) {
          updateItems.push({
            ...standardImage3Item,
            type: MODULE_NAME.M_FOOTER_BLOCK,
            valueImages: standardImage3FileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.FOOTER_STANDARD_IMAGE_3,
          valueImages: standardImage3FileList,
          type: MODULE_NAME.M_FOOTER_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [standardImage3FileList, standardImage3Item, updateItems, createItems]);

  const saveFooter = async () => {
    saveLogoImageItem();
    saveSologun();
    saveStandardImage1Item();
    saveStandardImage2();
    saveStandardImage3();

    if (updateItems.length > 0) {
      await updateCommons({ data: updateItems });
      setUpdateItems([]);
    }

    if (createItems.length > 0) {
      await createCommons({ data: createItems });
      setCreateItems([]);
    }
  };

  const resetLogoImage = useCallback(async () => {
    if (logoImageItem) {
      await deleteCommon(logoImageItem._id);
      setLogoImageFileList([]);
    }
  }, [logoImageItem, deleteCommon]);

  const resetSologun = useCallback(async () => {
    if (sologun) {
      await deleteCommon(sologunItem?._id);
      setSologun('');
    }
  }, [sologun, deleteCommon, sologunItem?._id]);

  const resetStandardImage1 = useCallback(async () => {
    if (standardImage1Item) {
      await deleteCommon(standardImage1Item._id);
      setStandardImage1FileList([]);
    }
  }, [standardImage1Item, deleteCommon]);

  const resetStandardImage2 = useCallback(async () => {
    if (standardImage2FileList) {
      await deleteCommon(standardImage2Item?._id);
      setStandardImage2FileList([]);
    }
  }, [standardImage2FileList, deleteCommon, standardImage2Item?._id]);

  const resetStandardImage3 = useCallback(async () => {
    if (standardImage3FileList) {
      await deleteCommon(standardImage3Item?._id);
      setStandardImage3FileList([]);
    }
  }, [standardImage3FileList, deleteCommon, standardImage3Item?._id]);

  const resetFooter = async () => {
    await resetLogoImage();
    await resetSologun();
    await resetStandardImage1();
    await resetStandardImage2();
    await resetStandardImage3();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const logoImage = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_LOGO);
      const sologun = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_SOLOGUN);
      const standardImage1 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_1);
      const standardImage2 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_2);
      const standardImage3 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_3);

      if (logoImage) {
        setLogoImageItem(logoImage);
        setLogoImageFileList(logoImage?.valueImages);
      }
      if (sologun) {
        setSologunItem(sologun);
        setSologun(sologun?.value);
      }
      if (standardImage1) {
        setStandardImage1Item(standardImage1);
        setStandardImage1FileList(standardImage1?.valueImages);
      }
      if (standardImage2) {
        setStandardImage2Item(standardImage2);
        setStandardImage2FileList(standardImage2?.valueImages);
      }
      if (standardImage3) {
        setStandardImage3Item(standardImage3);
        setStandardImage3FileList(standardImage3?.valueImages);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <Card
      style={{ marginTop: 16 }}
      className="footerBlock"
      type="inner"
      title={intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.footer' })}
      extra={
        <Space direction="horizontal">
          <Button type="ghost" onClick={resetFooter}>
            {intl.formatMessage({ id: 'common.button.revert' })}
          </Button>
          <Button type="primary" onClick={saveFooter}>
            {intl.formatMessage({ id: 'common.button.update' })}
          </Button>
        </Space>
      }
    >
      <div className="footerBlock-content">
        <div className="footerBlock-content-item">
          <ImageUpload
            fileList={logoImageFileList}
            ratio={1 / 1}
            setFileList={setLogoImageFileList}
            imageNumber={1}
            className="logoImage"
          />
        </div>
        <div className="footerBlock-content-standard">
          <ImageUpload
            fileList={standardImage1FileList}
            ratio={2 / 1}
            setFileList={setStandardImage1FileList}
            imageNumber={1}
            className="standard"
          />
          <div className='footerBlock-content-standard-items'>
            <ImageUpload
              fileList={standardImage2FileList}
              ratio={3 / 1}
              setFileList={setStandardImage2FileList}
              imageNumber={1}
              className="standardSmall"
            />
            <ImageUpload
              fileList={standardImage3FileList}
              ratio={3 / 1}
              setFileList={setStandardImage3FileList}
              imageNumber={1}
              className="standardSmall"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FooterBlock;
