import { Modal, Image, Space } from 'antd';
import { settingPagesHooks } from 'app/containers/Admin/SettingPage';
import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { PopupMenu } from 'models/popupMenu';
import { useEffect, useState } from 'react';
import { PopupMenuItem } from './components/PopupMenuItem';
import './PopupMenus.less';

const PopupMenus = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [popupMenus, setPopupMenus] = useState<PopupMenu[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const hideModal = () => {
    setOpen(false);
  };

  const { data: templateData, isLoading: isLoadingTemplateData } = settingPagesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_POPUP_MENU,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  const { data: dataPopupMenus, isLoading: isLoadingPopupMenus } = templatesHooks.usePopupMenus({
    pagination: {
      limit: 5,
      offset: 0,
    },
  });

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      // setDataSource(templateData.data);
      const hidden = templateData.data?.find((item: any) => item.name === SETTINGS.IS_HIDDEN);

      if (hidden) {
        setIsHidden(hidden?.value === 'true' ? true : false);
      }
    }
  }, [isLoadingTemplateData, templateData]);

  useEffect(() => {
    if (dataPopupMenus && !isLoadingPopupMenus) {
      setPopupMenus(dataPopupMenus);
    }
  }, [dataPopupMenus, isLoadingPopupMenus]);

  return isHidden === false ? (
    <Modal
      // title="Modal"
      className="popup-menu"
      visible={open}
      forceRender={open}
      onCancel={hideModal}
      footer={null}
    >
      <div className="leftBlock">
        <Image preview={false} src={'/images/woman_welcome_400.png'} className="image" />
      </div>
      <div className="rightBlock">
        <Space direction="vertical">
          {popupMenus.map(item => (
            <PopupMenuItem data={item} />
          ))}
        </Space>
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default PopupMenus;
