import { Carousel, Modal } from 'antd';
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
    setOpen(false)
  }
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
        visible={open}
        forceRender={open}
        onCancel={hideModal}
        footer={null}
      >
        {popupMenus.map(item => <PopupMenuItem  data={item}/>)}
      </Modal>
  );
};

export default PopupMenus;
