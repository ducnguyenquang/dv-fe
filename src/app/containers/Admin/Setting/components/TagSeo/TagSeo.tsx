import { Button, Card } from 'antd';
import { PAGE } from 'constants/products';
import { TagSeo as TagSeoModel } from 'models/tagSeo';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { settingsHooks } from '../../hooks';
import TagSeoItems from './components/TagSeoItems/TagSeoItems';

const TagSeo = (): JSX.Element => {
  const [tagSeos, setTagSeos] = useState<TagSeoModel[]>([]);
  const intl = useIntl();
  const [page] = React.useState(PAGE);
  const [pageSize] = React.useState(1000);
  const { data } = settingsHooks.useTagSeos({
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });

  const onChangeTagSeo = (data: TagSeoModel[]) => {
    setTagSeos(data);
  }

  const { mutateAsync: updateTagSeo } = settingsHooks.useUpdateTagSeo();


  const onUpdateTagSeos = useCallback(async (values: any) => {
    await updateTagSeo({
      ...values,
    })
  }, [updateTagSeo])

  return (
    <>
    <Helmet title={intl.formatMessage({ id: 'page.name.setting' })} />
    <Card title={intl.formatMessage({ id: 'page.name.setting' })}>
        <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={intl.formatMessage({ id: 'page.name.setting.tagSeo' })}
        extra={<Button type="primary" >
            {intl.formatMessage({ id: 'common.button.update' })}
        </Button>}
        >
            <TagSeoItems data={data as any} onChangeTagSeo={onChangeTagSeo}/>
        </Card>
    </Card>
    </>
  );
};

export default TagSeo;
