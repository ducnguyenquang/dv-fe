import { popupMenusHooks } from 'app/containers/Admin/PopupMenu';
import { PopupMenuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Adding = (): JSX.Element => {
  const { mutateAsync: createPopupMenu, isLoading: isLoadingCreatePopupMenu } = popupMenusHooks.useCreatePopupMenu();
  const onFinish = useCallback(async (values: any) => {
    await createPopupMenu({
      ...values,
    });
  },[createPopupMenu]);

  return <PopupMenuDetailForm key={'PopupMenuAdd'} onFinish={onFinish} isLoading={isLoadingCreatePopupMenu} />;
};

export default Adding;
