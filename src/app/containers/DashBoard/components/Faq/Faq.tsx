import { Button } from 'antd';
import { useIntl } from 'react-intl';
import './Faq.less'

const Faq = (): JSX.Element => {
  const intl = useIntl();

  return <div className='faq'>
    <div className='title'>{intl.formatMessage({ id: 'dashboard.faq.title' })}</div>
    <div className='questionBlock'>
      <div className='row'>
        <div className='item'>
          <div className='question'>{intl.formatMessage({ id: 'dashboard.faq.question1.title' })}</div>
          <div className='answer'>{intl.formatMessage({ id: 'dashboard.faq.question1.answer' })}</div>
        </div>
        <div className='item'>
          <div className='question'>{intl.formatMessage({ id: 'dashboard.faq.question2.title' })}</div>
          <div className='answer'>{intl.formatMessage({ id: 'dashboard.faq.question2.answer' })}</div>
        </div>
      </div>
      <div className='row'>
        <div className='item'>
          <div className='question'>{intl.formatMessage({ id: 'dashboard.faq.question3.title' })}</div>
          <div className='answer'>{intl.formatMessage({ id: 'dashboard.faq.question3.answer' })}</div>
        </div>
        <div className='item'>
          <div className='question'>{intl.formatMessage({ id: 'dashboard.faq.question4.title' })}</div>
          <div className='answer'>{intl.formatMessage({ id: 'dashboard.faq.question4.answer' })}</div>
        </div>
      </div>
    </div>
    <div className='link'>
      {intl.formatMessage({ id: 'dashboard.faq.link.text' })}
      <Button className='button' type="dashed" >{intl.formatMessage({ id: 'dashboard.faq.link.contact' }) }</Button>
    </div>
  </div>
}

export default Faq;
