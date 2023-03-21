import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pagesHooks } from 'app/containers/Admin/Page';
import { PageDetailForm } from '../PageDetailForm';
import { useCallback } from 'react';

const PageUpdate = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updatePage, isLoading: isLoadingUpdatePage } = pagesHooks.useUpdatePage();
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: pageDetailData, isLoading: isLoadingPageDetailData } = pagesHooks.usePage({ id });

  const onFinish = useCallback(
    async (values: any) => {
      await updatePage({
        ...values,
        _id: pageDetailData?._id,
      }).then((item: any) => {
        setDefaultValue({
          ...pageDetailData,
        });
      });
    },
    [pageDetailData, updatePage]
  );

  useEffect(() => {
    if (pageDetailData && !isLoadingPageDetailData) {
      setDefaultValue({
        ...pageDetailData,
      });
    }
  }, [pageDetailData, isLoadingPageDetailData]);

  return (
    defaultValue && (
      <PageDetailForm
        key={'pageUpdate'}
        isUpdate={true}
        initialValues={defaultValue}
        onFinish={onFinish}
        isLoading={isLoadingPageDetailData || isLoadingUpdatePage}
      />
    )
  );
};

export default PageUpdate;
