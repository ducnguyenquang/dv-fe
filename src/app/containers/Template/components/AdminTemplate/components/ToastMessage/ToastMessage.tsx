// import {
//   RadiusBottomleftOutlined,
//   RadiusBottomrightOutlined,
//   RadiusUpleftOutlined,
//   RadiusUprightOutlined,
// } from '@ant-design/icons';
import { notification } from 'antd';
// import type { NotificationPlacement } from 'antd/es/notification';
import React from 'react';
import { useIntl } from 'react-intl';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface IProps {
  type?: NotificationType;
  content?: string;
}

const ToastMessage: React.FC = ({ type, content }: IProps) => {
  const intl = useIntl();

  const openNotificationWithIcon = (type?: NotificationType) => {
    if (type) {
      switch (type) {
        case 'error':
          notification[type]({
            message: intl.formatMessage({ id: `errorHandler.${type}` }),
            description: content,
          });
          break;
        case 'success':
          notification[type]({
            message: intl.formatMessage({ id: `errorHandler.${type}` }),
            description: intl.formatMessage({ id: content }),
          });
          break;
        default:
          break;
      }
      
    }
  };
  // openNotificationWithIcon(type);
  return <>{openNotificationWithIcon(type)}</>;
};

export default ToastMessage;