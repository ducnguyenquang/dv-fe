import { Card, Space, Button, UploadFile } from 'antd';
import Editor from 'app/components/Editor/CkEditorClassic';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage/hooks';
import { MODULE_NAME, PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './CableBlock.less';

const CableBlock = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_HOME,
    type: MODULE_NAME.M_CABLE_BLOCK,
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

  const [cableImageItem, setCableImageItem] = useState<Common>();
  const [cableImageFileList, setCableImageFileList] = useState<UploadFile[]>([]);

  const [cableIconImageItem1, setCableIconImageItem1] = useState<Common>();
  const [cableIconImageFileList1, setCableIconImageFileList1] = useState<UploadFile[]>([]);

  const [cableIconImageItem2, setCableIconImageItem2] = useState<Common>();
  const [cableIconImageFileList2, setCableIconImageFileList2] = useState<UploadFile[]>([]);

  const [cableIntroductionItem1, setCableIntroductionItem1] = useState<Common>();
  const [cableIntroduction1, setCableIntroduction1] = useState<string>();

  const [cableIntroductionItem2, setCableIntroductionItem2] = useState<Common>();
  const [cableIntroduction2, setCableIntroduction2] = useState<string>();

  const saveCableIntroduction1 = useCallback(async () => {
    if (cableIntroductionItem1) {
      await updateCommon({
        ...cableIntroductionItem1,
        value: cableIntroduction1,
        type: MODULE_NAME.M_CABLE_BLOCK,
      });
    } else {
      await createCommon({
        name: SETTINGS.CABLE_INTRO_1,
        value: cableIntroduction1,
        type: MODULE_NAME.M_CABLE_BLOCK,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [cableIntroduction1, cableIntroductionItem1, createCommon, updateCommon]);

  const saveCableIntroduction2 = useCallback(async () => {
    if (cableIntroductionItem2) {
      await updateCommon({
        ...cableIntroductionItem2,
        type: MODULE_NAME.M_CABLE_BLOCK,
        value: cableIntroduction2,
      });
    } else {
      await createCommon({
        name: SETTINGS.CABLE_INTRO_2,
        value: cableIntroduction2,
        type: MODULE_NAME.M_CABLE_BLOCK,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [cableIntroduction2, cableIntroductionItem2, createCommon, updateCommon]);

  const saveCableIconImage1 = useCallback(async () => {
    if (cableIconImageItem1) {
      await updateCommon({
        ...cableIconImageItem1,
        type: MODULE_NAME.M_CABLE_BLOCK,
        valueImages: cableIconImageFileList1,
      });
    } else {
      await createCommon({
        name: SETTINGS.CABLE_ICON_IMAGE_1,
        valueImages: cableIconImageFileList1,
        type: MODULE_NAME.M_CABLE_BLOCK,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [cableIconImageItem1, updateCommon, cableIconImageFileList1, createCommon]);

  const saveCableIconImage2 = useCallback(async () => {
    if (cableIconImageItem2) {
      await updateCommon({
        ...cableIconImageItem2,
        type: MODULE_NAME.M_CABLE_BLOCK,
        valueImages: cableIconImageFileList2,
      });
    } else {
      await createCommon({
        name: SETTINGS.CABLE_ICON_IMAGE_2,
        valueImages: cableIconImageFileList2,
        type: MODULE_NAME.M_CABLE_BLOCK,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [cableIconImageItem2, updateCommon, cableIconImageFileList2, createCommon]);

  const saveCableImage = useCallback(async () => {
    if (cableImageItem) {
      await updateCommon({
        ...cableImageItem,
        type: MODULE_NAME.M_CABLE_BLOCK,
        valueImages: cableImageFileList,
      });
    } else {
      await createCommon({
        name: SETTINGS.CABLE_IMAGE,
        valueImages: cableImageFileList,
        type: MODULE_NAME.M_CABLE_BLOCK,
        group: PAGE_NAME.P_HOME,
      });
    }
  }, [cableImageItem, updateCommon, cableImageFileList, createCommon]);

  const saveCable = async () => {
    await saveCableImage();
    await saveCableIconImage1();
    await saveCableIconImage2();
    await saveCableIntroduction1();
    await saveCableIntroduction2();
  };


  const resetCableIntroduction1 = useCallback(async () => {
    if (cableIntroductionItem1) {
      await deleteCommon(cableIntroductionItem1._id);
      setCableIntroduction1('');
    }
  }, [cableIntroductionItem1, deleteCommon]);

  const resetCableIntroduction2 = useCallback(async () => {
    if (cableIntroductionItem2) {
      await deleteCommon(cableIntroductionItem2._id);
      setCableIntroduction2('');
    }
  }, [cableIntroductionItem2, deleteCommon]);

  const resetCableIconImage2 = useCallback(async () => {
    if (cableIconImageItem2) {
      await deleteCommon(cableIconImageItem2._id);
      setCableIconImageFileList2([]);
    }
  }, [cableIconImageItem2, deleteCommon]);

  const resetCableIconImage1 = useCallback(async () => {
    if (cableIconImageItem1) {
      await deleteCommon(cableIconImageItem1._id);
      setCableIconImageFileList1([]);
    }
  }, [cableIconImageItem1, deleteCommon]);

  const resetCableImage = useCallback(async () => {
    if (cableImageItem) {
      await deleteCommon(cableImageItem._id);
      setCableImageFileList([]);
    }
  }, [cableImageItem, deleteCommon]);

  const resetCable = async () => {
    await resetCableImage();
    await resetCableIconImage1();
    await resetCableIconImage2();
    await resetCableIntroduction1();
    await resetCableIntroduction2();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const cableImage = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_IMAGE);
      const cableIconImage1 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_ICON_IMAGE_1);
      const cableIconImage2 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_ICON_IMAGE_2);
      const cableIntro1 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_INTRO_1);
      const cableIntro2 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_INTRO_2);

      if (cableImage) {
        setCableImageItem(cableImage);
        setCableImageFileList(cableImage?.valueImages);
      }
      if (cableIconImage1) {
        setCableIconImageItem1(cableIconImage1);
        setCableIconImageFileList1(cableIconImage1?.valueImages);
      }
      if (cableIconImage2) {
        setCableIconImageItem2(cableIconImage2);
        setCableIconImageFileList2(cableIconImage2?.valueImages);
      }
      if (cableIntro1) {
        setCableIntroductionItem1(cableIntro1);
        setCableIntroduction1(cableIntro1?.value as string);
      }
      if (cableIntro2) {
        setCableIntroductionItem2(cableIntro2);
        setCableIntroduction2(cableIntro2?.value as string);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <Card
      style={{ marginTop: 16 }}
      className="cableBlock"
      type="inner"
      title={intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.cable' })}
      extra={
        <Space direction="horizontal">
          <Button type="ghost" onClick={resetCable}>
            {intl.formatMessage({ id: 'common.button.revert' })}
          </Button>
          <Button type="primary" onClick={saveCable}>
            {intl.formatMessage({ id: 'common.button.update' })}
          </Button>
        </Space>
      }
    >
      <ImageUpload
        fileList={cableImageFileList}
        ratio={1 / 1}
        setFileList={setCableImageFileList}
        imageNumber={1}
        className="cableImage"
      />
      <div className="rightBlock">
        <div className="rowItem">
          <ImageUpload
            fileList={cableIconImageFileList1}
            ratio={1 / 1}
            setFileList={setCableIconImageFileList1}
            imageNumber={1}
            className="cableImageIcon"
          />
          <Editor value={cableIntroduction1 || ''} onChange={setCableIntroduction1} />
        </div>
        <div className="rowItem">
          <ImageUpload
            fileList={cableIconImageFileList2}
            ratio={1 / 1}
            setFileList={setCableIconImageFileList2}
            imageNumber={1}
            className="cableImageIcon"
          />
          <Editor value={cableIntroduction2 || ''} onChange={setCableIntroduction2} />
        </div>
      </div>
    </Card>
  );
};

export default CableBlock;
