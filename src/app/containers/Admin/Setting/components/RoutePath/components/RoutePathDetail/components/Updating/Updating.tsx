import { RoutePath } from 'models/routePath';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { settingsHooks } from 'app/containers/Admin/Setting';
import { RoutePathDetailForm } from '../DetailForm';
import { useCallback } from 'react';

const Updating = (): JSX.Element => {
  const { id } = useParams();
  const { mutateAsync: updateRoutePath, isLoading: isLoadingUpdateRoutePath } = settingsHooks.useUpdateRoutePath();

  const [routePathDetail, setRoutePathDetail] = useState<RoutePath>({});
  const [defaultValue, setDefaultValue] = useState<any>();
  const { data: routePathDetailData, isLoading: isLoadingRoutePathDetail } = settingsHooks.useRoutePath({ id });
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = useCallback(async (values: any) => {
    await updateRoutePath({
      ...values,
      _id: routePathDetailData?._id,
    }).then((item: any) => {
      setRoutePathDetail(item?.data);
      setDefaultValue({
        ...routePathDetailData,
        body: decodeURIComponent(routePathDetailData?.body),
      });
    });
  }, [routePathDetailData, updateRoutePath])

  useEffect(() => {
    if (routePathDetailData && !isLoadingRoutePathDetail) {
      setRoutePathDetail(routePathDetailData);
      setDefaultValue({
        ...routePathDetailData,
        body: decodeURIComponent(routePathDetailData?.body),
      });
    }
  }, [routePathDetailData, isLoadingRoutePathDetail]);

  return defaultValue && <RoutePathDetailForm key={'RoutePathUpdate'} isUpdate={true} initialValues={defaultValue} onFinish={onFinish} isLoading={isLoadingRoutePathDetail || isLoadingUpdateRoutePath} />
};

export default Updating;
