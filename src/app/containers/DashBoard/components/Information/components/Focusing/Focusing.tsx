import { Image, Spin } from 'antd';
import { TrophyOutlined, ShopOutlined, AlertOutlined, ApiOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import './Focusing.less';
import { isMobile } from 'react-device-detect';
import { Context as AppContext } from 'app/context/appContext';
import { useContext, useEffect, useState } from 'react';
import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';

const Focusing = (): JSX.Element => {
  const intl = useIntl();
  const { orientation } = useContext(AppContext);
  const defaultImage = '/images/no-image.png';
  const [cableImage, setCableImage] = useState<string>();
  const [cableIconImage1, setCableIconImage1] = useState<string>();
  const [cableIconImage2, setCableIconImage2] = useState<string>();
  const [cableIntro1, setCableIntro1] = useState<string>();
  const [cableIntro2, setCableIntro2] = useState<string>();

  const [ledImage, setLedImage] = useState<string>();
  const [ledIconImage1, setLedIconImage1] = useState<string>();
  const [ledIconImage2, setLedIconImage2] = useState<string>();
  const [ledIntro1, setLedIntro1] = useState<string>();
  const [ledIntro2, setLedIntro2] = useState<string>();

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_HOME,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const cableImageTemp = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_IMAGE);
      const cableIconImage1Temp = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_ICON_IMAGE_1);
      const cableIconImage2Temp = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_ICON_IMAGE_2);
      const cableIntro1Temp = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_INTRO_1);
      const cableIntro2Temp = templateData.data?.find((item: any) => item.name === SETTINGS.CABLE_INTRO_2);

      const ledImageTemp = templateData.data?.find((item: any) => item.name === SETTINGS.LED_IMAGE);
      const ledIconImage1Temp = templateData.data?.find((item: any) => item.name === SETTINGS.LED_ICON_IMAGE_1);
      const ledIconImage2Temp = templateData.data?.find((item: any) => item.name === SETTINGS.LED_ICON_IMAGE_2);
      const ledIntro1Temp = templateData.data?.find((item: any) => item.name === SETTINGS.LED_INTRO_1);
      const ledIntro2Temp = templateData.data?.find((item: any) => item.name === SETTINGS.LED_INTRO_2);

      if (cableImageTemp) {
        setCableImage(cableImageTemp?.valueImages?.[0]?.url as string);
      }
      if (cableIconImage1Temp) {
        setCableIconImage1(cableIconImage1Temp?.valueImages?.[0]?.url as string);
      }
      if (cableIconImage2Temp) {
        setCableIconImage2(cableIconImage2Temp?.valueImages?.[0]?.url as string);
      }
      if (cableIntro1Temp) {
        setCableIntro1(cableIntro1Temp?.value);
      }
      if (cableIntro2Temp) {
        setCableIntro2(cableIntro2Temp?.value);
      }

      if (ledImageTemp) {
        setLedImage(ledImageTemp?.valueImages?.[0]?.url as string);
      }
      if (ledIconImage1Temp) {
        setLedIconImage1(ledIconImage1Temp?.valueImages?.[0]?.url as string);
      }
      if (ledIconImage2Temp) {
        setLedIconImage2(ledIconImage2Temp?.valueImages?.[0]?.url as string);
      }
      if (ledIntro1Temp) {
        setLedIntro1(ledIntro1Temp?.value);
      }
      if (ledIntro2Temp) {
        setLedIntro2(ledIntro2Temp?.value);
      }
    }
  }, [isLoadingTemplateData, templateData]);
  console.log('==== templateData', templateData);
  console.log('==== cableIconImage1', cableIconImage1);

  const loadDefaultImage = (error: any) => {
    error.target.src = defaultImage;
  };

  return (
    <div
      className={`focusingBlog ${isMobile && 'focusingBlog-mobile'} ${
        isMobile && orientation && `focusingBlog-mobile-${orientation}`
      }`}
    >
      <div className="focusingItem">
        <div className="itemImage">
          <Spin spinning={isLoadingTemplateData}>
            {cableImage ? (
              <Image preview={false} src={cableImage} onError={loadDefaultImage} />
            ) : (
              <Image preview={false} src="/images/cables.jpeg" />
            )}
          </Spin>
        </div>
        <div className="itemBlog">
          <div className="item">
            <div className="itemIcon">
              <Spin spinning={isLoadingTemplateData}>
                {cableIconImage1 ? (
                  <Image preview={false} src={cableIconImage1} onError={loadDefaultImage} />
                ) : (
                  <TrophyOutlined />
                )}
              </Spin>
            </div>
            <div className="itemInfo">
              <Spin spinning={isLoadingTemplateData}>
                {cableIntro1 ? (
                  <div className="ck-content" dangerouslySetInnerHTML={{ __html: cableIntro1 }} />
                ) : (
                  <>
                    <div className="title">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item1.title' })}
                    </div>
                    <div className="content">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item1.content' })}
                    </div>
                  </>
                )}
              </Spin>
            </div>
          </div>
          <div className="item">
            <div className="itemIcon">
              <Spin spinning={isLoadingTemplateData}>
                {cableIconImage2 ? (
                  <Image preview={false} src={cableIconImage2} onError={loadDefaultImage} />
                ) : (
                  <ShopOutlined />
                )}
              </Spin>
            </div>
            <div className="itemInfo">
              <Spin spinning={isLoadingTemplateData}>
                {cableIntro2 ? (
                  <div className="ck-content" dangerouslySetInnerHTML={{ __html: cableIntro2 }} />
                ) : (
                  <>
                    <div className="title">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item2.title' })}
                    </div>
                    <div className="content">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item2.content' })}
                    </div>
                  </>
                )}
              </Spin>
            </div>
          </div>
        </div>
      </div>
      <div className="focusingItem">
        <div className="itemBlog">
          <div className="item">
            <div className="itemIcon">
              <Spin spinning={isLoadingTemplateData}>
                {ledIconImage1 ? (
                  <Image preview={false} src={ledIconImage1} onError={loadDefaultImage} />
                ) : (
                  <AlertOutlined />
                )}
              </Spin>
            </div>
            <div className="itemInfo">
              <Spin spinning={isLoadingTemplateData}>
                {ledIntro1 ? (
                  <div className="ck-content" dangerouslySetInnerHTML={{ __html: ledIntro1 }} />
                ) : (
                  <>
                    <div className="title">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item3.title' })}
                    </div>
                    <div className="content">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item3.content' })}
                    </div>
                  </>
                )}
              </Spin>
            </div>
          </div>
          <div className="item">
            <div className="itemIcon">
              <Spin spinning={isLoadingTemplateData}>
                {ledIconImage2 ? (
                  <Image preview={false} src={ledIconImage2} onError={loadDefaultImage} />
                ) : (
                  <ApiOutlined />
                )}
              </Spin>
            </div>
            <div className="itemInfo">
              <Spin spinning={isLoadingTemplateData}>
                {ledIntro2 ? (
                  <div className="ck-content" dangerouslySetInnerHTML={{ __html: ledIntro2 }} />
                ) : (
                  <>
                    <div className="title">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item4.title' })}
                    </div>
                    <div className="content">
                      {intl.formatMessage({ id: 'dashboard.information.focusing.item4.content' })}
                    </div>
                  </>
                )}
              </Spin>
            </div>
          </div>
        </div>
        <div className="itemImage">
          <Spin spinning={isLoadingTemplateData}>
            {ledImage ? (
              <Image preview={false} src={ledImage} onError={loadDefaultImage} />
            ) : (
              <Image preview={false} src="/images/led-garden-lights.jpeg" />
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Focusing;
