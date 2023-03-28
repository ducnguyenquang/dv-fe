import { useIntl } from 'react-intl';
import './Distributor.less';
import { isMobile } from 'react-device-detect';
import { templatesHooks } from 'app/containers/Template';
import { MODULE_NAME, PAGE_NAME, SETTINGS } from 'constants/common';
import { useEffect, useState } from 'react';
import { Spin, Image } from 'antd';

const Distributor = (): JSX.Element => {
  const intl = useIntl();
  const defaultImage = '/images/no-image.png';

  const [leftImage, setLeftImage] = useState<string>();
  const [leftText, setLeftText] = useState<string>();

  const [rightImage, setRightImage] = useState<string>();
  const [rightText, setRightText] = useState<string>();

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_HOME,
      type: MODULE_NAME.M_DISTRIBUTOR_BLOCK,
    },
    pagination: {
      limit: 10,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const leftImage = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_LEFT_IMAGE);
      const leftText = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_LEFT_TEXT);
      const rightImage = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_RIGHT_IMAGE);
      const rightText = templateData.data?.find((item: any) => item.name === SETTINGS.DISTRIBUTOR_RIGHT_TEXT);

      if (leftImage) {
        setLeftImage(leftImage?.valueImages?.[0]?.url as string);
      }
      if (leftText) {
        setLeftText(leftText?.value);
      }
      if (rightImage) {
        setRightImage(rightImage?.valueImages?.[0]?.url as string);
      }
      if (rightText) {
        setRightText(rightText?.value);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  const loadDefaultImage = (error: any) => {
    error.target.src = defaultImage;
  };

  return (
    <div className={`distributor ${isMobile && 'distributor-mobile'}`}>
      <div className="title">{intl.formatMessage({ id: 'dashboard.information.distributor.title' })}</div>
      <div className="content">
        <a href="/electrical-cable">
          <div className="item">
            <div className="icon">
              <Spin spinning={isLoadingTemplateData}>
                {leftImage ? (
                  <Image preview={false} src={leftImage} onError={loadDefaultImage} />
                ) : (
                  <Image preview={false} src="/images/cable.png" />
                )}
              </Spin>
            </div>
            <div className="text">
              <Spin spinning={isLoadingTemplateData}>
                {leftText ? leftText : intl.formatMessage({ id: 'dashboard.information.distributor.item1.title' })}
              </Spin>
            </div>
          </div>
        </a>
        <a href="/led-light">
          <div className="item">
            <div className="icon">
              <Spin spinning={isLoadingTemplateData}>
                {rightImage ? (
                  <Image preview={false} src={rightImage} onError={loadDefaultImage} />
                ) : (
                  <Image preview={false} src="/images/led_lights.png" />
                )}
              </Spin>
            </div>
            <div className="text">
              <Spin spinning={isLoadingTemplateData}>
                {rightText ? rightText : intl.formatMessage({ id: 'dashboard.information.distributor.item2.title' })}
              </Spin>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Distributor;
