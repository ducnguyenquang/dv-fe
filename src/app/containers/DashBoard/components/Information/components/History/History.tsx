import { Image, Spin } from 'antd';
import { useIntl } from 'react-intl';
import './History.less';
import { isMobile } from 'react-device-detect';
import { templatesHooks } from 'app/containers/Template';
import { PAGE_NAME, SETTINGS } from 'constants/common';

const History = (): JSX.Element => {
  const intl = useIntl();

  const { data: templateData, isLoading: isLoadingTemplateData } = templatesHooks.useTemplates({
    search: {
      group: PAGE_NAME.P_HOME,
      name: SETTINGS.INTRODUCTION_BLOCK,
    },
    pagination: {
      limit: 1000,
      offset: 0,
    },
  });

  return (
    <Spin wrapperClassName={`historyBlog ${isMobile && 'historyBlog-mobile'}`} spinning={isLoadingTemplateData} >
      {templateData ? (
        <div className="ck-content"
          dangerouslySetInnerHTML={{ __html: templateData?.data?.[0]?.value }}
        />
      ) : (
        <>
          <div className="title">{intl.formatMessage({ id: 'dashboard.information.history.title' })}</div>
          <div className="content">{intl.formatMessage({ id: 'dashboard.information.history.content' })}</div>
        </>
      )}
    </Spin>
  );
};

export default History;
