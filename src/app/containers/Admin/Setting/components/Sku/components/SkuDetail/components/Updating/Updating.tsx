import { Sku } from 'models/sku';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { settingsHooks } from 'app/containers/Admin/Setting';
import { SkuDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Updating = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateSku, isLoading: isLoadingUpdateSku } = settingsHooks.useUpdateSku();
  const [skuDetail, setSkuDetail] = useState<Sku>({});
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: skuDetailData, isLoading: isLoadingSkuDetail } = settingsHooks.useSku({ id });

  const onFinish = useCallback(async (values: any) => {
    await updateSku({
      ...values,
      _id: skuDetailData?._id,
      brand: values.brand.value,
    }).then((item: any) => {
      setSkuDetail(item?.data);
      setDefaultValue({
        ...skuDetailData,
        body: decodeURIComponent(skuDetailData?.body),
      });
    });
  }, [skuDetailData, updateSku])

  useEffect(() => {
    if (skuDetailData && !isLoadingSkuDetail) {
      setSkuDetail(skuDetailData);
      setDefaultValue({
        ...skuDetailData,
        body: decodeURIComponent(skuDetailData?.body),
        brand: { value: skuDetailData.brand?._id, label: skuDetailData.brand?.name },
      });
    }
  }, [skuDetailData, isLoadingSkuDetail]);

  return defaultValue && <SkuDetailForm key={'SkuUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingSkuDetail || isLoadingUpdateSku} />
};

export default Updating;
