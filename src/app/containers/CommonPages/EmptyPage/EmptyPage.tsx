import { Button, Result } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import './EmptyPage.less';

const EmptyPage = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={intl.formatMessage({ id: 'common.emptyPage.content' })}
      extra={
        <Button type="primary" onClick={() => navigate(`/`)}>
          {intl.formatMessage({ id: 'common.button.goBack' })}
        </Button>
      }
    />
  );
};

export default EmptyPage;
