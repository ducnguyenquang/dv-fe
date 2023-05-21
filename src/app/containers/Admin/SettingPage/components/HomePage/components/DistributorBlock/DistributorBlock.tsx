import { Card, Space, Button, UploadFile, Input } from 'antd';
// import Editor from 'app/components/Editor/CkEditorClassic';
// import Editor from 'app/components/Editor/TinymceEditor';

import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage/hooks';
import { MODULE_NAME, PAGE_NAME, SETTINGS } from 'constants/common';
import { Common } from 'models/common';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './DistributorBlock.less';

const DistributorBlock = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_HOME,
    // type: `${MODULE_NAME.M_LED_BLOCK}|${MODULE_NAME.M_CABLE_BLOCK}`,
    type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
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

  const [leftImageItem, setLeftImageItem] = useState<Common>();
  const [leftImageFileList, setLeftImageFileList] = useState<UploadFile[]>([]);
  const [leftTextItem, setLeftTextItem] = useState<Common>();
  const [leftText, setLeftText] = useState<string>();

  const [rightImageItem, setRightImageItem] = useState<Common>();
  const [rightImageFileList, setRightImageFileList] = useState<UploadFile[]>([]);
  const [rightTextItem, setRightTextItem] = useState<Common>();
  const [rightText, setRightText] = useState<string>();

  const saveLeftImageItem = useCallback(async () => {
    if (leftImageFileList !== undefined) {
      if (leftImageItem) {
        if (leftImageFileList !== leftImageItem.valueImages) {
          updateItems.push({
            ...leftImageItem,
            type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
            valueImages: leftImageFileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.DISTRIBUTOR_LEFT_IMAGE,
          valueImages: leftImageFileList,
          type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [leftImageFileList, leftImageItem, updateItems, createItems]);

  const saveLeftText = useCallback(async () => {
    if (leftText !== undefined) {
      if (leftTextItem) {
        if (leftText !== leftTextItem.value) {
          updateItems.push({
            ...leftTextItem,
            type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
            value: leftText,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.DISTRIBUTOR_LEFT_TEXT,
          value: leftText,
          type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [leftText, leftTextItem, updateItems, createItems]);

  const saveRightImageItem = useCallback(async () => {
    if (rightImageFileList !== undefined) {
      if (rightImageItem) {
        if (rightImageFileList !== rightImageItem.valueImages) {
          updateItems.push({
            ...rightImageItem,
            type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
            valueImages: rightImageFileList,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.DISTRIBUTOR_RIGHT_IMAGE,
          valueImages: rightImageFileList,
          type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [rightImageFileList, rightImageItem, updateItems, createItems]);

  const saveRightText = useCallback(async () => {
    if (rightText !== undefined) {
      if (rightTextItem) {
        if (rightText !== rightTextItem.value) {
          updateItems.push({
            ...rightTextItem,
            type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
            value: rightText,
          });
        }
      } else {
        createItems.push({
          name: SETTINGS.DISTRIBUTOR_RIGHT_TEXT,
          value: rightText,
          type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
          group: PAGE_NAME.P_HOME,
        });
      }
    }
  }, [rightText, rightTextItem, updateItems, createItems]);

  const saveDistributor = async () => {
    saveLeftImageItem();
    saveLeftText();
    saveRightImageItem();
    saveRightText();

    if (updateItems.length > 0) {
      await updateCommons({ data: updateItems });
      setUpdateItems([]);
    }

    if (createItems.length > 0) {
      await createCommons({ data: createItems });
      setCreateItems([]);
    }
  };


  const resetLeftImage = useCallback(async () => {
    if (leftImageItem) {
      await deleteCommon(leftImageItem._id);
      setLeftImageFileList([]);
    }
  }, [leftImageItem, deleteCommon]);

  const resetLeftText = useCallback(async () => {
    if (leftText) {
      await deleteCommon(leftTextItem?._id);
      setLeftText('');
    }
  }, [leftText, deleteCommon, leftTextItem?._id]);

  const resetRightImage = useCallback(async () => {
    if (rightImageItem) {
      await deleteCommon(rightImageItem._id);
      setRightImageFileList([]);
    }
  }, [rightImageItem, deleteCommon]);

  const resetRightText = useCallback(async () => {
    if (rightText) {
      await deleteCommon(rightTextItem?._id);
      setRightText('');
    }
  }, [rightText, deleteCommon, rightTextItem?._id]);


  const resetDistributor = async () => {
    await resetLeftImage();
    await resetLeftText();
    await resetRightImage();
    await resetRightText();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const leftImage = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_LEFT_IMAGE);
      const leftText = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_LEFT_TEXT);
      const rightImage = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_RIGHT_IMAGE);
      const rightText = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_RIGHT_TEXT);

      if (leftImage) {
        setLeftImageItem(leftImage);
        setLeftImageFileList(leftImage?.valueImages);
      }
      if (leftText) {
        setLeftTextItem(leftText);
        setLeftText(leftText?.value);
      }
      if (rightImage) {
        setRightImageItem(rightImage);
        setRightImageFileList(rightImage?.valueImages);
      }
      if (rightText) {
        setRightTextItem(rightText);
        setRightText(rightText?.value);
      }
      
    }
  }, [isLoadingTemplateData, templateData]);

  return (
    <Card
      style={{ marginTop: 16 }}
      className="distributorBlock"
      type="inner"
      title={intl.formatMessage({ id: 'admin.settingPage.home-page.introduction.distributor' })}
      extra={
        <Space direction="horizontal">
          <Button type="ghost" onClick={resetDistributor}>
            {intl.formatMessage({ id: 'common.button.revert' })}
          </Button>
          <Button type="primary" onClick={saveDistributor}>
            {intl.formatMessage({ id: 'common.button.update' })}
          </Button>
        </Space>
      }
    >
      <div className='distributorBlock-content'>
        <div className="distributorBlock-content-item">
          <ImageUpload
            fileList={leftImageFileList}
            ratio={1 / 1}
            setFileList={setLeftImageFileList}
            imageNumber={1}
            className="ledImageIcon"
          />
          <Input value={leftText || ''} onChange={(e) => setLeftText(e.target.value)}/>
        </div>
        <div className="distributorBlock-content-item">
          <ImageUpload
            fileList={rightImageFileList}
            ratio={1 / 1}
            setFileList={setRightImageFileList}
            imageNumber={1}
            className="ledImageIcon"
          />
          <Input value={rightText || ''} onChange={(e) => setRightText(e.target.value)}/>
        </div>
        </div>
    </Card>
  );
};

export default DistributorBlock;
