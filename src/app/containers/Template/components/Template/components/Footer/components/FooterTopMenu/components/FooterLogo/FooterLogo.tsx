import { Image, Spin } from 'antd';
import { useIntl } from 'react-intl';
import './FooterLogo.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext, useEffect, useState } from 'react';
import { templatesHooks } from 'app/containers/Template/hooks';
import { PAGE_NAME, MODULE_NAME, SETTINGS } from 'constants/common';

const FooterLogo = (): JSX.Element => {
  const intl = useIntl();
  const { isMobile } = useContext(AppContext);
  const defaultImage = '/images/no-image.png';

  const [logoImage, setLogoImage] = useState<string>();
  const [sologunText, setSologunText] = useState<string>();
  // const [standard1Image, setStandard1Image] = useState<string>();
  // const [standard2Image, setStandard2Image] = useState<string>();
  // const [standard3Image, setStandard3Image] = useState<string>();

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_HOME,
      type: MODULE_NAME.M_FOOTER_BLOCK,
    },
    pagination: {
      limit: 10,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      const logoImageTemp = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_LOGO);
      const sologunTemp = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_SOLOGUN);
      // const standardImage1 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_1);
      // const standardImage2 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_2);
      // const standardImage3 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_3);

      if (logoImageTemp) {
        setLogoImage(logoImageTemp.valueImages?.[0]?.url as string);
      }
      if (sologunTemp) {
        setSologunText(sologunTemp.value);
      }
      // if (standardImage1) {
      //   setStandard1Image(standardImage1.valueImages?.[0]?.url as string);
      // }
      // if (standardImage2) {
      //   setStandard2Image(standardImage2.valueImages?.[0]?.url as string);
      // }
      // if (standardImage3) {
      //   setStandard3Image(standardImage3.valueImages?.[0]?.url as string);
      // }
    }
  }, [isLoadingTemplateData, templateData]);

  const loadDefaultImage = (error: any) => {
    error.target.src = defaultImage;
  };

  return (
    <div className={`logo ${isMobile && 'logo-mobile'}`}>
      <a href="/">
        <Spin spinning={isLoadingTemplateData}>
          {logoImage ? (
            <Image preview={false} src={logoImage} onError={loadDefaultImage} />
          ) : (
            <Image width={200} preview={false} src="/images/logo_text.png" />
          )}
        </Spin>
        <Spin spinning={isLoadingTemplateData}>
          {sologunText ? (
            <div>{sologunText}</div>
          ) : (
            <div>{intl.formatMessage({ id: 'template.footer.slogun' })}</div>
          )}
        </Spin>
      </a>
    </div>
  );
};
export default FooterLogo;
