import { Collapse } from 'antd';
import { useIntl } from 'react-intl';
// import { CartItem } from '../Cart/components/CartItem';
// import { Map } from './components/Map'
import { getCities, getWards } from 'utils/location/location';
import React, { useCallback, useEffect, useState } from 'react';
import './Faq.less';
const Faq = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="faqBlock">
      <Collapse>
        <Collapse.Panel header="Làm sao mua hàng khi không hiện giá ?" key="1">
          <p>
            Bạn có thể thêm sản phẩm vô giỏ hàng rồi bấm thanh toán, sau đó sẽ có nhân viên tư vấn liên hệ bạn ngay khi
            nhận được thông tin. Nhân viên sẽ tư vấn và báo giá các sản phẩm mà bạn đang quan tâm
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Tôi sẽ phải thanh toán tiền ngay khi bấm thanh toán ?" key="2">
          <p>
            Bạn chưa cần thanh toán tiền ngay, sau khi nhân viên bên Đại Việt liên hệ tư vấn, báo giá và sẽ liên hệ cụ
            thể cách thanh toán tiền cho khách hàng nắm
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Các sản phẩm trên website là hàng như thế nào ?" key="3">
          <p>
            Tất cả các sản phẩm trên website Đại Việt là hàng chính hãng và nguồn gốc rõ ràng. Đại Việt tự hào là nhà
            phân phối cáp điện Cadivi và các sản phẩm Led do chính Đại Việt phát triễn và sản xuất.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Khoảng bao lâu nhân viên sẽ liên hệ sau khi tôi mua hàng trên website ?" key="4">
          <p>
            Khoảng 2-3 ngày sẽ có nhân viên liên hệ ngay khi nhận được thông tin. Vì vậy bạn vui lòng cung cấp các thông
            tin rõ ràng và chính xác để tránh việc sai thông tin dẫn đến chậm trễ và không thể liên hệ tới Khách hàng
          </p>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Faq;
