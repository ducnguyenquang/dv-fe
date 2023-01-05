import { Carousel, Modal, Image } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { templatesHooks } from 'app/containers/Template';
import { PopupMenu } from 'models/popupMenu';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PopupMenuItem } from './components/PopupMenuItem';
import './PopupMenus.less';

const PopupMenus = (): JSX.Element => {
  const intl = useIntl();
  const [open, setOpen] = useState(true);
  const [popupMenus, setPopupMenus] = useState<PopupMenu[]>([]);

  const hideModal = () => {
    setOpen(false);
  };
  const { data: dataPopupMenus, isLoading: isLoadingPopupMenus } = templatesHooks.usePopupMenus({
    pagination: {
      limit: 5,
      offset: 0,
    },
  });

  useEffect(() => {
    if (dataPopupMenus && !isLoadingPopupMenus) {
      setPopupMenus(dataPopupMenus);
      // setTagSeos([defaultTagSeos, dataTagSeos?.data?.map((item: TagSeo) => item.name)]);
    }
  }, [dataPopupMenus, isLoadingPopupMenus]);

  return (
    <Modal
      // title="Modal"
      className='popup-menu'
      visible={open}
      forceRender={open}
      onCancel={hideModal}
      footer={null}
    >
      <div className='leftBlock'>
        <Image preview={false} src={'/images/woman_welcome_400.png'} className="image" />
      </div>
      <div className='rightBlock'>
        {popupMenus.map(item => (
          <PopupMenuItem data={item} />
        ))}
      </div>
    </Modal>
  );
};

export default PopupMenus;
