import { SolutionOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useIntl } from 'react-intl';
import './Construction.less';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

const Construction = (): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div className={`construction ${isMobile && 'construction-mobile'}`}>
      <div className="icon">
        <SolutionOutlined />
      </div>
      <div className='title ck-content' dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'dashboard.contruction.title' }) }}></div>
      <div className='subTitle' >{intl.formatMessage({ id: 'dashboard.contruction.subTitle' }) }</div>
      <Button className='button' type="dashed" onClick={() => window.location.href = '/#project'}>{intl.formatMessage({ id: 'dashboard.contruction.button' }) }</Button>
    </div>
  );
};

export default Construction;
