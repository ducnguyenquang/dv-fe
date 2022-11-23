import { Button, List, Result } from 'antd';
import { useIntl } from 'react-intl';
import './MaintenancePage.less';

const MaintenancePage = (): JSX.Element => {
  const intl = useIntl();


  return (
    <Result
      status="403"
      title="403"
      subTitle={intl.formatMessage({ id: 'common.MaintenancePage.content' })}
      extra={<Button type="primary" onClick={() => window.location.href='/'}>{intl.formatMessage({ id: 'common.button.goBack' })}</Button>}
    />
  );
};

export default MaintenancePage;
