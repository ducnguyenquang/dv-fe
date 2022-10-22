// import { SolutionOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './ReviewFilter.less';


interface IProp {
  onReviewSelected?: any;
  defaultValue?: any;
}

const ReviewFilter = ({ onReviewSelected, defaultValue }: IProp): JSX.Element => {
  const intl = useIntl();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue]);

  return (
    <div className='reviewFilter'>
      <h1>{intl.formatMessage({ id: 'template.leftMenu.reviewFilter.title' })}</h1>
      <Rate onChange={onReviewSelected} value={value} />
    </div>
  );
};

export default ReviewFilter;
