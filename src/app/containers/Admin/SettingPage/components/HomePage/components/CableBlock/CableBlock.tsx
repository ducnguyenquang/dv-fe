import { Card, Space, Button, UploadFile } from 'antd';
// import Editor from 'app/components/Editor/CkEditorClassic';
import Editor from 'app/components/Editor/TinymceEditor';

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

  const { mutateAsync: deleteCommon } = settingPagesHooks.useDeleteTemplate();
  const { mutateAsync: updateCommons } = settingPagesHooks.useUpdateTemplates();
  const { mutateAsync: createCommons } = settingPagesHooks.useCreateTemplates();

  const [updateItems, setUpdateItems] = useState<Common[]>([]);
  const [createItems, setCreateItems] = useState<Common[]>([]);

  const [cableImageItem, setCableImageItem] = useState<Common>();
  const [cableImageFileList, setCableImageFileList] = useState<UploadFile[]>([]);
  const [cableImage1Item, setCableImage1Item] = useState<Common>();
  const [cableImage1FileList, setCableImage1FileList] = useState<UploadFile[]>([]);
  const [cableImage2Item, setCableImage2Item] = useState<Common>();
  const [cableImage2FileList, setCableImage2FileList] = useState<UploadFile[]>([]);
  const [cableImage3Item, setCableImage3Item] = useState<Common>();
  const [cableImage3FileList, setCableImage3FileList] = useState<UploadFile[]>([]);
  const [cableImage4Item, setCableImage4Item] = useState<Common>();
  const [cableImage4FileList, setCableImage4FileList] = useState<UploadFile[]>([]);

  const [cableIconImageItem1, setCableIconImageItem1] = useState<Common>();
  const [cableIconImageFileList1, setCableIconImageFileList1] = useState<UploadFile[]>([]);
  const [cableIconImageItem2, setCableIconImageItem2] = useState<Common>();
  const [cableIconImageFileList2, setCableIconImageFileList2] = useState<UploadFile[]>([]);

  const [cableIntroductionItem1, setCableIntroductionItem1] = useState<Common>();
  const [cableIntroduction1, setCableIntroduction1] = useState<string>();
  const [cableIntroductionItem2, setCableIntroductionItem2] = useState<Common>();
  const [cableIntroduction2, setCableIntroduction2] = useState<string>();

  const saveCableIntroduction1 = useCallback(async () => {
    if (cableIntroduction1 !== undefined) {
      if (cableIntroductionItem1) {
        if (cableIntroduction1 !== cableIntroductionItem1.value) {
          updateItems.push({
            ...cableIntroductionItem1,
            type: MODULE_NAME.M_CABLE_BLOCK,
            value: cableIntroduction1,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_INTRO_1,
          value: cableIntroduction1,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableIntroduction1, cableIntroductionItem1, createItems, updateItems]);

  const saveCableIntroduction2 = useCallback(async () => {
    if (cableIntroduction2 !== undefined) {
      if (cableIntroductionItem2) {
        if (cableIntroduction2 !== cableIntroductionItem2.value) {
          updateItems.push({
            ...cableIntroductionItem2,
            type: MODULE_NAME.M_CABLE_BLOCK,
            value: cableIntroduction2,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_INTRO_2,
          value: cableIntroduction2,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableIntroduction2, cableIntroductionItem2, createItems, updateItems]);

  const saveCableIconImage1 = useCallback(async () => {
    if (cableIconImageFileList1 !== undefined) {
      if (cableIconImageItem1) {
        if (cableIconImageFileList1 !== cableIconImageItem1.valueImages) {
          updateItems.push({
            ...cableIconImageItem1,
            type: MODULE_NAME.M_CABLE_BLOCK,
            valueImages: cableIconImageFileList1,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_ICON_IMAGE_1,
          valueImages: cableIconImageFileList1,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableIconImageFileList1, cableIconImageItem1, updateItems, createItems]);

  const saveCableIconImage2 = useCallback(async () => {
    if (cableIconImageFileList2 !== undefined) {
      if (cableIconImageItem2) {
        if (cableIconImageFileList2 !== cableIconImageItem2.valueImages) {
          updateItems.push({
            ...cableIconImageItem2,
            type: MODULE_NAME.M_CABLE_BLOCK,
            valueImages: cableIconImageFileList2,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_ICON_IMAGE_2,
          valueImages: cableIconImageFileList2,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableIconImageFileList2, cableIconImageItem2, updateItems, createItems]);

  const saveCableImage = useCallback(async () => {
    if (cableImageFileList !== undefined) {
      if (cableImageItem) {
        if (cableImageFileList !== cableImageItem.valueImages) {
          updateItems.push({
            ...cableImageItem,
            type: MODULE_NAME.M_CABLE_BLOCK,
            valueImages: cableImageFileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_IMAGE,
          valueImages: cableImageFileList,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableImageFileList, cableImageItem, updateItems, createItems]);

  const saveCableImage1 = useCallback(async () => {
    if (cableImage1FileList !== undefined) {
      if (cableImage1Item) {
        if (cableImage1FileList !== cableImage1Item.valueImages) {
          updateItems.push({
            ...cableImage1Item,
            type: MODULE_NAME.M_CABLE_BLOCK,
            valueImages: cableImage1FileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_IMAGE_1,
          valueImages: cableImage1FileList,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableImage1FileList, cableImage1Item, updateItems, createItems]);

  const saveCableImage2 = useCallback(async () => {
    if (cableImage2FileList !== undefined) {
      if (cableImage2Item) {
        if (cableImage2FileList !== cableImage2Item.valueImages) {
          updateItems.push({
            ...cableImage2Item,
            type: MODULE_NAME.M_CABLE_BLOCK,
            valueImages: cableImage2FileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_IMAGE_2,
          valueImages: cableImage2FileList,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableImage2FileList, cableImage2Item, updateItems, createItems]);

  const saveCableImage3 = useCallback(async () => {
    if (cableImage3FileList !== undefined) {
      if (cableImage3Item) {
        if (cableImage3FileList !== cableImage3Item.valueImages) {
          updateItems.push({
            ...cableImage3Item,
            type: MODULE_NAME.M_CABLE_BLOCK,
            valueImages: cableImage3FileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_IMAGE_3,
          valueImages: cableImage3FileList,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableImage3FileList, cableImage3Item, updateItems, createItems]);

  const saveCableImage4 = useCallback(async () => {
    if (cableImage4FileList !== undefined) {
      if (cableImage4Item) {
        if (cableImage4FileList !== cableImage4Item.valueImages) {
          updateItems.push({
            ...cableImage4Item,
            type: MODULE_NAME.M_CABLE_BLOCK,
            valueImages: cableImage4FileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.CABLE_IMAGE_4,
          valueImages: cableImage4FileList,
          type: MODULE_NAME.M_CABLE_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [cableImage4FileList, cableImage4Item, updateItems, createItems]);

  const saveCable = async () => {
    saveCableImage();
    saveCableImage1();
    saveCableImage2();
    saveCableImage3();
    saveCableImage4();
    saveCableIconImage1();
    saveCableIconImage2();
    saveCableIntroduction1();
    saveCableIntroduction2();

    if (updateItems.length > 0) {
      await updateCommons({ data: updateItems });
      setUpdateItems([]);
    }

    if (createItems.length > 0) {
      await createCommons({ data: createItems });
      setCreateItems([]);
    }
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

  const resetCableImage1 = useCallback(async () => {
    if (cableImage1Item) {
      await deleteCommon(cableImage1Item._id);
      setCableImage1FileList([]);
    }
  }, [cableImage1Item, deleteCommon]);

  const resetCableImage2 = useCallback(async () => {
    if (cableImage2Item) {
      await deleteCommon(cableImage2Item._id);
      setCableImage2FileList([]);
    }
  }, [cableImage2Item, deleteCommon]);

  const resetCableImage3 = useCallback(async () => {
    if (cableImage3Item) {
      await deleteCommon(cableImage3Item._id);
      setCableImage3FileList([]);
    }
  }, [cableImage3Item, deleteCommon]);

  const resetCableImage4 = useCallback(async () => {
    if (cableImage4Item) {
      await deleteCommon(cableImage4Item._id);
      setCableImage4FileList([]);
    }
  }, [cableImage4Item, deleteCommon]);

  const resetCable = async () => {
    await resetCableImage();
    await resetCableImage1();
    await resetCableImage2();
    await resetCableImage3();
    await resetCableImage4();
    await resetCableIconImage1();
    await resetCableIconImage2();
    await resetCableIntroduction1();
    await resetCableIntroduction2();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const cableImage = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_IMAGE);
      const cableImage1 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_IMAGE_1);
      const cableImage2 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_IMAGE_2);
      const cableImage3 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_IMAGE_3);
      const cableImage4 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_IMAGE_4);
      const cableIconImage1 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_ICON_IMAGE_1);
      const cableIconImage2 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_ICON_IMAGE_2);
      const cableIntro1 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_INTRO_1);
      const cableIntro2 = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_INTRO_2);

      if (cableImage) {
        setCableImageItem(cableImage);
        setCableImageFileList(cableImage?.valueImages);
      }
      if (cableImage1) {
        setCableImage1Item(cableImage1);
        setCableImage1FileList(cableImage1?.valueImages);
      }
      if (cableImage2) {
        setCableImage2Item(cableImage2);
        setCableImage2FileList(cableImage2?.valueImages);
      }
      if (cableImage3) {
        setCableImage3Item(cableImage3);
        setCableImage3FileList(cableImage3?.valueImages);
      }
      if (cableImage4) {
        setCableImage4Item(cableImage4);
        setCableImage4FileList(cableImage4?.valueImages);
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
      <div className="leftBlock">
        <ImageUpload
          fileList={cableImageFileList}
          ratio={1 / 1}
          setFileList={setCableImageFileList}
          imageNumber={1}
          className="cableImage"
        />
        <div className='slideImages'>
          <ImageUpload
            fileList={cableImage1FileList}
            ratio={1 / 1}
            setFileList={setCableImage1FileList}
            imageNumber={1}
            className='slideImages-item'
          />
          <ImageUpload
            fileList={cableImage2FileList}
            ratio={1 / 1}
            setFileList={setCableImage2FileList}
            imageNumber={1}
            className='slideImages-item'
          />
          <ImageUpload
            fileList={cableImage3FileList}
            ratio={1 / 1}
            setFileList={setCableImage3FileList}
            className='slideImages-item'
            imageNumber={1}
          />
          <ImageUpload
            fileList={cableImage4FileList}
            ratio={1 / 1}
            setFileList={setCableImage4FileList}
            className='slideImages-item'
            imageNumber={1}
          />
        </div>
      </div>
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
