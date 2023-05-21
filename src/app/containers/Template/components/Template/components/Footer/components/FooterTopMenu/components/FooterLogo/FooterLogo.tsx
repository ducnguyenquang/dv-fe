import { Image, Spin } from 'antd';
import { useIntl } from 'react-intl';
import './FooterLogo.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext, useEffect, useState } from 'react';
import { templatesHooks } from 'app/containers/Template/hooks';
import { PAGE_NAME, MODULE_NAME, SETTINGS } from 'constants/common';

const FooterLogo = (): JSX.Element => {

  const { isMobile } = useContext(AppContext);
  const defaultImage = '/images/no-image.png';

  const [logoImage, setLogoImage] = useState<string>();


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

      if (logoImageTemp) {
        setLogoImage(logoImageTemp.valueImages?.[0]?.url as string);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  const loadDefaultImage = (error: any) => {
    error.target.src = defaultImage;
  };

  return (
    <div className={`footerlogo ${isMobile && 'footerlogo-mobile'}`}>
      <a href="/">
        <Spin spinning={isLoadingTemplateData}>
          {logoImage ? (
            <Image preview={false} src={logoImage} onError={loadDefaultImage} />
          ) : (
            <Image preview={false} src="/images/logo_text.png" />
          )}
        </Spin>
      </a>
    </div>
  );
};
export default FooterLogo;
