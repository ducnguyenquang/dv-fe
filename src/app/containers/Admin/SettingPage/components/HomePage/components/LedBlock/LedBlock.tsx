import { Card, Space, Button, UploadFile } from 'antd';
import Editor from 'app/components/Editor/CkEditorClassic';
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
    // type: `${MODULE_NAME.M_LED_BLOCK}|${MODULE_NAME.M_CABLE_BLOCK}`,
    type: MODULE_NAME.M_LED_BLOCK,
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
    if (ledIntroductionItem1) {
      await updateCommon({
        ...ledIntroductionItem1,
        value: ledIntroduction1,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    } else {
      await createCommon({
        name: SETTINGS.LED_INTRO_1,
        value: ledIntroduction1,
        group: PAGE_NAME.P_HOME,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    }
  }, [ledIntroduction1, ledIntroductionItem1, createCommon, updateCommon]);

  const saveLedIntroduction2 = useCallback(async () => {
    if (ledIntroductionItem2) {
      await updateCommon({
        ...ledIntroductionItem2,
        value: ledIntroduction2,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    } else {
      await createCommon({
        name: SETTINGS.LED_INTRO_2,
        value: ledIntroduction2,
        group: PAGE_NAME.P_HOME,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    }
  }, [ledIntroduction2, ledIntroductionItem2, createCommon, updateCommon]);

  const saveLedIconImage1 = useCallback(async () => {
    if (ledIconImageItem1) {
      await updateCommon({
        ...ledIconImageItem1,
        valueImages: ledIconImageFileList1,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    } else {
      await createCommon({
        name: SETTINGS.LED_ICON_IMAGE_1,
        valueImages: ledIconImageFileList1,
        group: PAGE_NAME.P_HOME,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    }
  }, [ledIconImageItem1, updateCommon, ledIconImageFileList1, createCommon]);

  const saveLedIconImage2 = useCallback(async () => {
    if (ledIconImageItem2) {
      await updateCommon({
        ...ledIconImageItem2,
        valueImages: ledIconImageFileList2,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    } else {
      await createCommon({
        name: SETTINGS.LED_ICON_IMAGE_2,
        valueImages: ledIconImageFileList2,
        group: PAGE_NAME.P_HOME,
        type: MODULE_NAME.M_LED_BLOCK,
      });
    }
  }, [ledIconImageItem2, updateCommon, ledIconImageFileList2, createCommon]);

  const saveLedImage = useCallback(async () => {
    if (ledImageItem) {
      await updateCommon({
        ...ledImageItem,
        type: MODULE_NAME.M_LED_BLOCK,
        valueImages: ledImageFileList,
      });
    } else {
      await createCommon({
        name: SETTINGS.LED_IMAGE,
        valueImages: ledImageFileList,
        type: MODULE_NAME.M_LED_BLOCK,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [ledImageItem, updateCommon, ledImageFileList, createCommon]);

  const saveLed = async () => {
    await saveLedImage();
    await saveLedIconImage1();
    await saveLedIconImage2();
    await saveLedIntroduction1();
    await saveLedIntroduction2();
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
