import { Card, Image } from 'antd';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';
import { productsHooks } from 'app/containers/Product';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { Support } from 'models/support';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PhoneOutlined } from '@ant-design/icons';
import './SupportMenu.less';
import { Link } from 'react-router-dom';

const SupportMenu = (): JSX.Element => {
  const intl = useIntl();
  const [page, setPage] = useState(PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [supports, setSupports] = useState<Support[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isHiddenPhoneIcon, setIsHiddenPhoneIcon] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>();

  const { data: supportData, isLoading: isLoadingSupportData } = productsHooks.useSupports({
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_SUPPORT,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      // setDataSource(templateData.data);
      const hidden = templateData.data?.find((item: any) => item.name === SETTINGS.IS_HIDDEN);
      const hiddenPhoneIcon = templateData.data?.find((item: any) => item.name === SETTINGS.IS_HIDDEN_PHONE_ICON);
      const fontSizeNumber = templateData.data?.find((item: any) => item.name === SETTINGS.FONT_SIZE);

      if (hidden) {
        setIsHidden(hidden?.value === 'true' ? true : false);
      }

      if (hiddenPhoneIcon) {
        setIsHiddenPhoneIcon(hiddenPhoneIcon?.value === 'true' ? true : false);
      }
      
      if (fontSizeNumber) {
        setFontSize(fontSizeNumber.value)
      }
    }
  }, [isLoadingTemplateData, templateData]);

  useEffect(() => {
    if (supportData && !isLoadingSupportData) {
      setSupports(supportData?.data);
    }
  }, [isLoadingSupportData, supportData]);

  return isHidden === false ? (
    <div className="supportMenu">
      <Card title={intl.formatMessage({ id: 'page.name.support' })} bordered={false}>
        {supports &&
          supports.map((item: any) => {
            return (
              <div key={item} className="supportItem">
                <div>
                  <span className="supportTitle">{item.title ? `${item.title}: ` : ''} </span>
                  <span className="supportName">{item.name ? `(${item.name})` : ''}</span>
                  <span>
                    <a href={`https://zalo.me/${item.phone}`} target="_blank" rel="noreferrer">
                      <Image preview={false} width={20} src="/images/icon-zalo.svg" />
                    </a>
                  </span>
                </div>
                <div className="supportPhone">
                  {!isHiddenPhoneIcon && <PhoneOutlined width={15} className="iconShake" />}
                  <span style={{fontSize: `${fontSize}px`}}>{item.phone}</span>
                </div>
              </div>
            );
          })}
      </Card>
    </div>
  ) : (
    <></>
  );
};

export default SupportMenu;
