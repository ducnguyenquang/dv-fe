import { Card, Space, Button, UploadFile } from 'antd';
// import Editor from 'app/components/Editor/CkEditorClassic';
import Editor from 'app/components/Editor/TinymceEditor';

import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage/hooks';
import { MODULE_NAME, PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './LedBlock.less';

const LedBlock = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_HOME,
    type: MODULE_NAME.M_LED_BLOCK,
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

  const [ledImageItem, setLedImageItem] = useState<Common>();
  const [ledImageFileList, setLedImageFileList] = useState<UploadFile[]>([]);

  const [ledIconImageItem1, setLedIconImageItem1] = useState<Common>();
  const [ledIconImageFileList1, setLedIconImageFileList1] = useState<UploadFile[]>([]);

  const [ledIconImageItem2, setLedIconImageItem2] = useState<Common>();
  const [ledIconImageFileList2, setLedIconImageFileList2] = useState<UploadFile[]>([]);

  const [ledIntroductionItem1, setLedIntroductionItem1] = useState<Common>();
  const [ledIntroduction1, setLedIntroduction1] = useState<string>();

  const [ledIntroductionItem2, setLedIntroductionItem2] = useState<Common>();
  const [ledIntroduction2, setLedIntroduction2] = useState<string>();

  const saveLedIntroduction1 = useCallback(async () => {
    if (ledIntroduction1 !== undefined) {
      if (ledIntroductionItem1) {
        if (ledIntroduction1 !== ledIntroductionItem1.value) {
          updateItems.push({
            ...ledIntroductionItem1,
            type: MODULE_NAME.M_LED_BLOCK,
            value: ledIntroduction1,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.LED_INTRO_1,
          value: ledIntroduction1,
          type: MODULE_NAME.M_LED_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [ledIntroduction1, ledIntroductionItem1, updateItems, createItems]);

  const saveLedIntroduction2 = useCallback(async () => {
    if (ledIntroduction2 !== undefined) {
      if (ledIntroductionItem2) {
        if (ledIntroduction2 !== ledIntroductionItem2.value) {
          updateItems.push({
            ...ledIntroductionItem2,
            type: MODULE_NAME.M_LED_BLOCK,
            value: ledIntroduction2,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.LED_INTRO_2,
          value: ledIntroduction2,
          type: MODULE_NAME.M_LED_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [ledIntroduction2, ledIntroductionItem2, updateItems, createItems]);

  const saveLedIconImage1 = useCallback(async () => {
    if (ledIconImageFileList1 !== undefined) {
      if (ledIconImageItem1) {
        if (ledIconImageFileList1 !== ledIconImageItem1.valueImages) {
          updateItems.push({
            ...ledIconImageItem1,
            type: MODULE_NAME.M_LED_BLOCK,
            valueImages: ledIconImageFileList1,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.LED_ICON_IMAGE_1,
          valueImages: ledIconImageFileList1,
          type: MODULE_NAME.M_LED_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [ledIconImageFileList1, ledIconImageItem1, updateItems, createItems]);

  const saveLedIconImage2 = useCallback(async () => {
    if (ledIconImageFileList2 !== undefined) {
      if (ledIconImageItem2) {
        if (ledIconImageFileList2 !== ledIconImageItem2.valueImages) {
          updateItems.push({
            ...ledIconImageItem2,
            type: MODULE_NAME.M_LED_BLOCK,
            valueImages: ledIconImageFileList2,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.LED_ICON_IMAGE_2,
          valueImages: ledIconImageFileList2,
          type: MODULE_NAME.M_LED_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [createItems, ledIconImageFileList2, ledIconImageItem2, updateItems]);

  const saveLedImage = useCallback(async () => {
    if (ledImageFileList !== undefined) {
      if (ledImageItem) {
        if (ledImageFileList !== ledImageItem.valueImages) {
          updateItems.push({
            ...ledImageItem,
            type: MODULE_NAME.M_LED_BLOCK,
            valueImages: ledImageFileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.LED_IMAGE,
          valueImages: ledImageFileList,
          type: MODULE_NAME.M_LED_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [ledImageFileList, ledImageItem, updateItems, createItems]);

  const saveLed = async () => {
    saveLedImage();
    saveLedIconImage1();
    saveLedIconImage2();
    saveLedIntroduction1();
    saveLedIntroduction2();

    if (updateItems.length > 0) {
      await updateCommons({ data: updateItems });
      setUpdateItems([]);
    }

    if (createItems.length > 0) {
      await createCommons({ data: createItems });
      setCreateItems([]);
    }
  };

  const resetLedIntroduction1 = useCallback(async () => {
    if (ledIntroductionItem1) {
      await deleteCommon(ledIntroductionItem1._id);
      setLedIntroduction1('');
    }
  }, [ledIntroductionItem1, deleteCommon]);

  const resetLedIntroduction2 = useCallback(async () => {
    if (ledIntroductionItem2) {
      await deleteCommon(ledIntroductionItem2._id);
      setLedIntroduction2('');
    }
  }, [ledIntroductionItem2, deleteCommon]);

  const resetLedIconImage2 = useCallback(async () => {
    if (ledIconImageItem2) {
      await deleteCommon(ledIconImageItem2._id);
      setLedIconImageFileList2([]);
    }
  }, [ledIconImageItem2, deleteCommon]);

  const resetLedIconImage1 = useCallback(async () => {
    if (ledIconImageItem1) {
      await deleteCommon(ledIconImageItem1._id);
      setLedIconImageFileList1([]);
    }
  }, [ledIconImageItem1, deleteCommon]);

  const resetLedImage = useCallback(async () => {
    if (ledImageItem) {
      await deleteCommon(ledImageItem._id);
      setLedImageFileList([]);
    }
  }, [ledImageItem, deleteCommon]);

  const resetLed = async () => {
    await resetLedImage();
    await resetLedIconImage1();
    await resetLedIconImage2();
    await resetLedIntroduction1();
    await resetLedIntroduction2();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const ledImage = templateData.data?.find((item: any) => item.name === SETTINGS.LED_IMAGE);
      const ledIconImage1 = templateData.data?.find((item: any) => item.name === SETTINGS.LED_ICON_IMAGE_1);
      const ledIconImage2 = templateData.data?.find((item: any) => item.name === SETTINGS.LED_ICON_IMAGE_2);
      const ledIntro1 = templateData.data?.find((item: any) => item.name === SETTINGS.LED_INTRO_1);
      const ledIntro2 = templateData.data?.find((item: any) => item.name === SETTINGS.LED_INTRO_2);

      if (ledImage) {
        setLedImageItem(ledImage);
        setLedImageFileList(ledImage?.valueImages);
      }
      if (ledIconImage1) {
        setLedIconImageItem1(ledIconImage1);
        setLedIconImageFileList1(ledIconImage1?.valueImages);
      }
      if (ledIconImage2) {
        setLedIconImageItem2(ledIconImage2);
        setLedIconImageFileList2(ledIconImage2?.valueImages);
      }
      if (ledIntro1) {
        setLedIntroductionItem1(ledIntro1);
        setLedIntroduction1(ledIntro1?.value as string);
      }
      if (ledIntro2) {
        setLedIntroductionItem2(ledIntro2);
        setLedIntroduction2(ledIntro2?.value as string);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <Card
      style={{ marginTop: 16 }}
      className="ledBlock"
      type="inner"
      title={intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.led' })}
      extra={
        <Space direction="horizontal">
          <Button type="ghost" onClick={resetLed}>
            {intl.formatMessage({ id: 'common.button.revert' })}
          </Button>
          <Button type="primary" onClick={saveLed}>
            {intl.formatMessage({ id: 'common.button.update' })}
          </Button>
        </Space>
      }
    >
      <ImageUpload
        fileList={ledImageFileList}
        ratio={1 / 1}
        setFileList={setLedImageFileList}
        imageNumber={1}
        className="ledImage"
      />
      <div className="rightBlock">
        <div className="rowItem">
          <ImageUpload
            fileList={ledIconImageFileList1}
            ratio={1 / 1}
            setFileList={setLedIconImageFileList1}
            imageNumber={1}
            className="ledImageIcon"
          />
          <Editor value={ledIntroduction1 || ''} onChange={setLedIntroduction1} />
        </div>
        <div className="rowItem">
          <ImageUpload
            fileList={ledIconImageFileList2}
            ratio={1 / 1}
            setFileList={setLedIconImageFileList2}
            imageNumber={1}
            className="ledImageIcon"
          />
          <Editor value={ledIntroduction2 || ''} onChange={setLedIntroduction2} />
        </div>
      </div>
    </Card>
  );
};

export default LedBlock;
