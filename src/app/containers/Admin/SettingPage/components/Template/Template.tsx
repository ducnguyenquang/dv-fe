import { Card, Button, Radio, UploadFile, Space } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import './Template.less';
import { PicCenterOutlined, ColumnWidthOutlined, BorderLeftOutlined, BorderRightOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';
import { Common } from 'models/common';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';

const Template = (): JSX.Element => {
  const intl = useIntl();
  const [search, setSearch] = useState({
    group: PAGE_NAME.P_TEMPLATE,
  });

  const [isCreated, setIsCreated] = useState(false);

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
  const { mutateAsync: uploadFile } = settingPagesHooks.useUploadFiles();

  const [backgroundColorItem, setBackgroundColorItem] = useState<Common>();
  const [layoutStructureItem, setLayoutStructureItem] = useState<Common>();
  const [logoItem, setLogoItem] = useState<Common>();


  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [layoutStructure, setLayoutStructure] = useState<string>();
  
  const [logofileList, setLogoFileList] = useState<UploadFile[]>([]);

  const saveLayoutStructure = useCallback(async () => {
    if (layoutStructureItem) {
      await updateCommon({
        ...layoutStructureItem,
        value: layoutStructure,
      });
    } else {
      await createCommon({
        name: SETTINGS.LAYOUT_STRUCTURE,
        value: layoutStructure,
        group: PAGE_NAME.P_TEMPLATE,
      });
    }
  }, [createCommon, layoutStructure, layoutStructureItem, updateCommon]);

  const saveBackgroundColor = useCallback(async () => {
    if (backgroundColorItem) {
      await updateCommon({
        ...backgroundColorItem,
        value: backgroundColor,
      });
    } else {
      await createCommon({
        name: SETTINGS.BACKGROUND_COLOR,
        value: backgroundColor,
        group: PAGE_NAME.P_TEMPLATE,
      });
      setIsCreated(true);
    }
  }, [backgroundColor, backgroundColorItem, createCommon, updateCommon]);

  const saveLogo = useCallback(async () => {
    let id = logoItem?._id;
    if (logoItem) {
      await updateCommon({
        ...logoItem,
        valueImages: logofileList,
      });
    } else {
      await createCommon({
        name: SETTINGS.LOGO,
        valueImages: logofileList,
        group: PAGE_NAME.P_TEMPLATE,
      });
    }
  }, [logoItem, updateCommon, logofileList, createCommon]);

  const saveTemplate = async () => {
    await saveLayoutStructure();
    await saveBackgroundColor();
    await saveLogo();
  };

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const bgColor = templateData.data?.find((item: any) => item.name === SETTINGS.BACKGROUND_COLOR);
      const layout = templateData.data?.find((item: any) => item.name === SETTINGS.LAYOUT_STRUCTURE);
      const logo = templateData.data?.find((item: any) => item.name === SETTINGS.LOGO);

      if (bgColor) {
        setBackgroundColorItem(bgColor);
        setBackgroundColor(bgColor?.value as string);
      }
      if (layout) {
        setLayoutStructureItem(layout);
        setLayoutStructure(layout?.value as string);
      }
      if (logo) {
        setLogoItem(logo);
        setLogoFileList(logo?.valueImages);
      }
    }
  }, [isLoadingTemplateData, templateData, setLayoutStructure, setBackgroundColor]);

  const resetLogo = useCallback(async () => {
    if (logoItem) {
      await deleteCommon(logoItem._id);
      setLogoFileList([]);
    }
  }, [logoItem, deleteCommon]);


  const getLayoutStructure = useCallback((item: any) => {
    return <Radio.Group
    defaultValue={item}
    buttonStyle="solid"
    onChange={e => setLayoutStructure(e.target.value)}
  >
    <Radio.Button value="full-screen">
      <PicCenterOutlined /> {intl.formatMessage({ id: 'admin.settingPage.template.layout.full-screen' })}
    </Radio.Button>
    <Radio.Button value="padding-both">
      <ColumnWidthOutlined /> {intl.formatMessage({ id: 'admin.settingPage.template.layout.padding-both' })}
    </Radio.Button>
    <Radio.Button value="padding-left">
      <BorderLeftOutlined /> {intl.formatMessage({ id: 'admin.settingPage.template.layout.padding-left' })}
    </Radio.Button>
    <Radio.Button value="padding-right">
      <BorderRightOutlined /> {intl.formatMessage({ id: 'admin.settingPage.template.layout.padding-right' })}
    </Radio.Button>
  </Radio.Group>
  }, [intl])
  
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'admin.settingPage.template.title-page' })} />
      <Card
        title={intl.formatMessage({ id: 'admin.settingPage.template.title-page' })}
        extra={
          <Button type="primary" onClick={saveTemplate}>
            {intl.formatMessage({ id: 'common.button.updateAll' })}
          </Button>
        }
      >
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.template.layout.background-color' })}
          extra={
            <Button type="primary" onClick={saveBackgroundColor}>
              {intl.formatMessage({ id: 'common.button.update' })}
            </Button>
          }
        >
          {backgroundColor && <ColorPicker initialColor={backgroundColor} saveColor={setBackgroundColor} />}
          {!backgroundColorItem && !backgroundColor && <ColorPicker initialColor={backgroundColor} saveColor={setBackgroundColor} />}
        </Card>
        
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.template.logo.name' })}
          extra={
            <Space direction="horizontal">
              <Button type="ghost" onClick={resetLogo}>
                {intl.formatMessage({ id: 'common.button.revert' })}
              </Button>
              <Button type="primary" onClick={saveLogo}>
                {intl.formatMessage({ id: 'common.button.update' })}
              </Button>
            </Space>
          }
        >
          <ImageUpload fileList={logofileList} setFileList={setLogoFileList} imageNumber={1} />
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={intl.formatMessage({ id: 'admin.settingPage.template.layout.name' })}
          extra={
            <Button type="primary" onClick={saveLayoutStructure}>
              {intl.formatMessage({ id: 'common.button.update' })}
            </Button>
          }
        >
          { layoutStructure && getLayoutStructure(layoutStructure)}
          { !layoutStructureItem && !layoutStructure && getLayoutStructure(layoutStructure)}
        </Card>

        
      </Card>
    </>
  );
};

export default Template;
