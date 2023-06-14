import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

import './ScrollToTopButton.less';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const throttle = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
    let timerId: NodeJS.Timeout | null;
    return (...args: T) => {
      if (timerId) return;
      timerId = setTimeout(() => {
        callback(...args);
        timerId = null;
      }, delay);
    };
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <ArrowUpOutlined />
    </div>
  );
};

export default ScrollToTopButton;