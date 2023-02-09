import { SolutionOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useIntl } from 'react-intl';
import './Construction.less';
import { isMobile } from 'react-device-detect';

const Construction = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className={`construction ${isMobile && 'construction-mobile'}`}>
      <div className="icon">
        <SolutionOutlined />
      </div>
      <div className='title' dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'dashboard.contruction.title' }) }}></div>
      <div className='subTitle' >{intl.formatMessage({ id: 'dashboard.contruction.subTitle' }) }</div>
      <Button className='button' type="dashed" >{intl.formatMessage({ id: 'dashboard.contruction.button' }) }</Button>
    </div>
  );
};

export default Construction;
