import {
  Select,
} from 'antd';
// import { EmailTemplatesHooks } from '../../../hooks';
// import { EmailTemplatesSelectors } from '../../../redux/selectors';
import { popupMenusHooks } from 'app/containers/Admin/PopupMenu';
import { PopupMenuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

// interface IProps {
//   caterogy?: string;
//   id?: string;
// }

// const { Option } = Select;
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

const Adding = (): JSX.Element => {
  const { mutateAsync: createPopupMenu, isLoading: isLoadingCreatePopupMenu } = popupMenusHooks.useCreatePopupMenu();
  // const PopupMenuDetailParam = useSelector(PopupMenusSelectors.getPopupMenu);

  // const { data: categoriesData, isLoading: isLoadingCategories } = settingsHooks.useCategories({
  //   pagination: {
  //     limit: PAGE_SIZE * 100000,
  //     offset: PAGE - 1,
  //   },
  // });

  const onFinish = useCallback(async (values: any) => {
    const data = await createPopupMenu({
      ...values,
      // body: encodeURIComponent(values?.body)
    });
    window.location.href = `/admin/setting/popupMenu/${data?._id}`;
  },[createPopupMenu]);

  console.log('==== Adding');
  return <PopupMenuDetailForm key={'PopupMenuAdd'} onFinish={onFinish} isLoading={isLoadingCreatePopupMenu} />;
};

export default Adding;
