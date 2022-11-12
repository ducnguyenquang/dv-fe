import { Slider, Input } from 'antd';
// import Sider from 'antd/lib/layout/Sider';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './PricingFilter.less';

interface IProp {
  onPricingSelected?: any;
  defaultValue?: any;
}

const PricingFilter = ({ onPricingSelected, defaultValue }: IProp): JSX.Element => {
  const intl = useIntl();

  const [inputValue, setInputValue] = useState<[number, number]>(defaultValue);
  // console.log('==== PricingFilter inputValue', inputValue)
  const onChange = (newValue: [number, number]) => {
    // console.log('==== newValue', newValue)
    setInputValue(newValue);
    onPricingSelected(newValue)
  };

  useEffect(() => {
    // if (defaultValue) {
      setInputValue(defaultValue)
    // }
  }, [defaultValue]);

  // const formatter = (value: [number, number]) => `${value}%`;
  
  return (
    <div className='pricingFilter'>
      {/* <h1>{intl.formatMessage({ id: 'template.leftMenu.pricingFilter.title' })}</h1> */}
      <Slider
          onChange={onChange}
          value={inputValue}
          range={{ draggableTrack: true }} 
          // tooltip={{ formatter }}
        />
      <div className='input'>
        <div className='inputBlock'>
          <div className='title'>{intl.formatMessage({ id: 'template.leftMenu.pricingFilter.min' })}</div>
          <Input placeholder={intl.formatMessage({ id: 'template.leftMenu.pricingFilter.min' })} value={inputValue?.[0]} />
        </div>
        <div className='inputBlock'>
          <div className='title'>{intl.formatMessage({ id: 'template.leftMenu.pricingFilter.max' })}</div>
          <Input placeholder={intl.formatMessage({ id: 'template.leftMenu.pricingFilter.max' })} value={inputValue?.[1]} />
        </div>
      </div>
    </div>
  );
};

export default PricingFilter;
