import { pagesHooks } from 'app/containers/Admin/Page';
import { PageDetailForm } from '../PageDetailForm';
import { useCallback } from 'react';

const PageAdd = (): JSX.Element => {
  const { mutateAsync: createPage, isLoading: isLoadingCreatePage } = pagesHooks.useCreatePage();

  const onFinish = useCallback(
    async (values: any) => {
      await createPage(values);
    },
    [createPage]
  );

  return <PageDetailForm key={'pageAdd'} onFinish={onFinish} isLoading={isLoadingCreatePage} isUpdate={false} />;
};

export default PageAdd;
