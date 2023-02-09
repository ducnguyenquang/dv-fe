import { Button, Collapse } from 'antd';
import { useIntl } from 'react-intl';
import './Faq.less';
import { isMobile } from 'react-device-detect';

const Faq = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className={`faq ${isMobile && 'faq-mobile'}`}>
      <div className="title">{intl.formatMessage({ id: 'dashboard.faq.title' })}</div>
      <div className="questionBlock">
        <Collapse>
          <Collapse.Panel header={intl.formatMessage({ id: 'dashboard.faq.question1.title' })} key="1">
            {intl.formatMessage({ id: 'dashboard.faq.question1.answer' })}
          </Collapse.Panel>
          <Collapse.Panel header={intl.formatMessage({ id: 'dashboard.faq.question2.title' })} key="2">
            {intl.formatMessage({ id: 'dashboard.faq.question2.answer' })}
          </Collapse.Panel>
          <Collapse.Panel header={intl.formatMessage({ id: 'dashboard.faq.question3.title' })} key="3">
            {intl.formatMessage({ id: 'dashboard.faq.question3.answer' })}
          </Collapse.Panel>
          <Collapse.Panel header={intl.formatMessage({ id: 'dashboard.faq.question4.title' })} key="4">
            {intl.formatMessage({ id: 'dashboard.faq.question4.answer' })}
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="link">
        {intl.formatMessage({ id: 'dashboard.faq.link.text' })}
        <Button className="button" type="dashed">
          {intl.formatMessage({ id: 'dashboard.faq.link.contact' })}
        </Button>
      </div>
    </div>
  );
};

export default Faq;
