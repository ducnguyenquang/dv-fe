import { advertisementsHooks } from 'app/containers/Admin/Advertisement';
import { AdvertisementDetailForm } from '../AdvertisementDetailForm';
import { useCallback } from 'react';

const AdvertisementAdd = (): JSX.Element => {
  const { mutateAsync: createAdvertisement, isLoading: isLoadingCreateBrand } = advertisementsHooks.useCreateAdvertisement();
  const onFinish = useCallback(
    async (values: any) => {
      await createAdvertisement(values);
    },
    [createAdvertisement]
  );

  return <AdvertisementDetailForm key={'advertisementAdd'} onFinish={onFinish} isLoading={isLoadingCreateBrand} isUpdate={false} />;
};

export default AdvertisementAdd;
