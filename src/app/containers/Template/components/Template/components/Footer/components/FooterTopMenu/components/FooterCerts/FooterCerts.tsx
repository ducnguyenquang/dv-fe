import { Image, Spin } from 'antd';
import './FooterCerts.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext, useEffect, useState } from 'react';
import { templatesHooks } from 'app/containers/Template/hooks';
import { PAGE_NAME, MODULE_NAME, SETTINGS } from 'constants/common';

const FooterCerts = (): JSX.Element => {
  const { isMobile } = useContext(AppContext);
  const defaultImage = '/images/no-image.png';

  const [standard1Image, setStandard1Image] = useState<string>();
  const [standard2Image, setStandard2Image] = useState<string>();
  const [standard3Image, setStandard3Image] = useState<string>();

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
      const standardImage1 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_1);
      const standardImage2 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_2);
      const standardImage3 = templateData.data?.find((item: any) => item.name === SETTINGS.FOOTER_STANDARD_IMAGE_3);

      if (standardImage1) {
        setStandard1Image(standardImage1.valueImages?.[0]?.url as string);
      }
      if (standardImage2) {
        setStandard2Image(standardImage2.valueImages?.[0]?.url as string);
      }
      if (standardImage3) {
        setStandard3Image(standardImage3.valueImages?.[0]?.url as string);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  const loadDefaultImage = (error: any) => {
    error.target.src = defaultImage;
  };

  return (
    <div className={`certs ${isMobile && 'certs-mobile'}`}>
      <div className="cert">
        <Spin spinning={isLoadingTemplateData}>
          {standard1Image ? (
            <Image width={100} preview={false} src={standard1Image} onError={loadDefaultImage} />
          ) : (
            <Image width={100} preview={false} src="/images/iso-9001-2008.jpeg" />
          )}
        </Spin>
      </div>
      <div className="bocongthuong">
        <Spin spinning={isLoadingTemplateData}>
          {standard2Image ? (
            <Image width={100} preview={false} src={standard2Image} onError={loadDefaultImage} />
          ) : (
            <Image width={100} preview={false} src="/images/bocongthuong-thongbao.png" />
          )}
          {standard3Image ? (
            <Image width={100} preview={false} src={standard3Image} onError={loadDefaultImage} />
          ) : (
            <Image width={100} preview={false} src="/images/bocongthuong-dangky.png" />
          )}
        </Spin>
      </div>
    </div>
  );
};
export default FooterCerts;
