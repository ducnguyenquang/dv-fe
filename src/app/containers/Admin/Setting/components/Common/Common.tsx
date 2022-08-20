import { Button, Space, Table, Tag, Popconfirm, Card } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { productsHooks, productsActions, productsApi } from 'app/containers/Admin/Product';
// import { ServiceTable } from 'common/components/ServiceTable';
// import { PAGE, PAGE_SIZE } from 'constants/products';
// import { Category } from 'models/category';
// import { Product } from 'models/product';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import SeoTags from '../SeoTags/SeoTags';

const Common = (): JSX.Element => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any>([]);
  const intl = useIntl();

  return (
    <>
    <Helmet title={intl.formatMessage({ id: 'page.name.setting' })} />
    <Card title={intl.formatMessage({ id: 'page.name.setting' })}>
        <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={intl.formatMessage({ id: 'page.name.setting.tagSeo' })}
        extra={<Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'common.button.update' })}
        </Button>}
        >
            <SeoTags data={['Tag1', 'Tag2']}/>
        </Card>
    </Card>
    </>
  );
};

export default Common;
