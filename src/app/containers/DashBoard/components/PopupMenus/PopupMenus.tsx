import { Modal, Space } from 'antd';
import { settingsActions, settingsSelectors } from 'app/containers/Admin/Setting';
import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';
import { PopupMenu } from 'models/popupMenu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopupMenuItem } from './components/PopupMenuItem';
import './PopupMenus.less';

const PopupMenus = (): JSX.Element => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [popupMenus, setPopupMenus] = useState<PopupMenu[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const hideModal = () => {
    setOpen(false);
    dispatch(settingsActions.setPopMenuOpened(true));
  };

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
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
    isHidden: false,
  });

  const popupMenuOpened = useSelector(settingsSelectors.getPopupMenuOpened);

  useEffect(() => {
    if (templateData && !isLoadingTemplateData) {
      // setDataSource(templateData.data);
      const hidden = templateData.data?.find((item: any) => item.name === SETTINGS.IS_HIDDEN);

      if (hidden) {
        const isHiddenStatus = hidden?.value === 'true';
        setIsHidden(isHiddenStatus ? true : false);
      }
    }
  }, [dispatch, isLoadingTemplateData, templateData]);

  useEffect(() => {
    if (dataPopupMenus && !isLoadingPopupMenus) {
      setPopupMenus(dataPopupMenus);
    }
  }, [dataPopupMenus, isLoadingPopupMenus]);

  return isHidden === false && popupMenuOpened === false ? (
    <Modal
      wrapClassName="popup-menu"
      visible={open}
      forceRender={open}
      onCancel={hideModal}
      footer={null}
      centered
      closable={false}
    >
      {/* <div className="leftBlock">
        <Image preview={false} src={'/images/woman_welcome_400.png'} className="image" />
      </div> */}
      {/* <div className="rightBlock"> */}
        <Space direction="vertical">
          {popupMenus.map(item => (
            <PopupMenuItem data={item} />
          ))}
        </Space>
      {/* </div> */}
    </Modal>
  ) : (
    <></>
  );
};

export default PopupMenus;
