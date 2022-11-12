import { Timeline } from 'antd';
import React from 'react';
import { SmileOutlined, AuditOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

const History = (): JSX.Element => {
  const intl = useIntl();

  return (
    <Timeline className="history">
      <Timeline.Item>2005: {intl.formatMessage({ id: 'aboutUs.history.2005' })}</Timeline.Item>
      <Timeline.Item dot={<AuditOutlined />} color="#e5704b">
        2015: {intl.formatMessage({ id: 'aboutUs.history.2015' })}
      </Timeline.Item>
      <Timeline.Item>
        <p>{intl.formatMessage({ id: 'aboutUs.history.2015-extent' })}</p>
        <ul>
          <li>{intl.formatMessage({ id: 'aboutUs.history.daiViet' })}</li>
          <li>{intl.formatMessage({ id: 'aboutUs.history.thienAn' })}</li>
          <li>{intl.formatMessage({ id: 'aboutUs.history.kimSang' })}</li>
        </ul>
      </Timeline.Item>
    </Timeline>
  );
};

export default History;
