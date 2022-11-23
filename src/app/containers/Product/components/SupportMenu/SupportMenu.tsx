import { Card } from 'antd';
import { productsHooks } from 'app/containers/Product';
import { PAGE, PAGE_SIZE } from 'constants/pagination';
import { Support } from 'models/support';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './SupportMenu.less';

const SupportMenu = (): JSX.Element => {
  const intl = useIntl();
  const [page, setPage] = useState(PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [supports, setSupports] = useState<Support[]>([]);

  const { data: supportData, isLoading: isLoadingSupportData } = productsHooks.useSupports({
    pagination: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  useEffect(() => {
    if (supportData && !isLoadingSupportData) {
      setSupports(supportData?.data);
    }
  }, [isLoadingSupportData, supportData]);

  return (
    <div className="supportMenu">
      <Card title={intl.formatMessage({ id: 'page.name.support' })} bordered={false} style={{ width: 300 }}>
        {supports && supports.map((item: any) => `${item.name} (${item.title}): ${item.phone}`)}
      </Card>
    </div>
  );
};

export default SupportMenu;
