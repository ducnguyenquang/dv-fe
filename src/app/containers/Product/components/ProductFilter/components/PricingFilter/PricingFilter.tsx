import { Slider, Input } from 'antd';
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
  const onChange = (newValue: [number, number]) => {
    setInputValue(newValue);
    onPricingSelected(newValue);
  };

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="pricingFilter">
      <Slider
        onChange={onChange}
        value={inputValue}
        range={{ draggableTrack: true }}
      />
      <div className="input">
        <div className="inputBlock">
          <div className="title">{intl.formatMessage({ id: 'template.leftMenu.pricingFilter.min' })}</div>
          <Input
            placeholder={intl.formatMessage({ id: 'template.leftMenu.pricingFilter.min' })}
            value={inputValue?.[0]}
          />
        </div>
        <div className="inputBlock">
          <div className="title">{intl.formatMessage({ id: 'template.leftMenu.pricingFilter.max' })}</div>
          <Input
            placeholder={intl.formatMessage({ id: 'template.leftMenu.pricingFilter.max' })}
            value={inputValue?.[1]}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingFilter;
