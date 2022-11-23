import { Button, List, Result } from 'antd';
import { useIntl } from 'react-intl';
import './EmptyPage.less';

const EmptyPage = (): JSX.Element => {
  const intl = useIntl();


  return (
    <Result
      status="404"
      title="404"
      subTitle={intl.formatMessage({ id: 'common.emptyPage.content' })}
      extra={<Button type="primary" onClick={() => window.location.href='/'}>{intl.formatMessage({ id: 'common.button.goBack' })}</Button>}
    />
  );
};

export default EmptyPage;
