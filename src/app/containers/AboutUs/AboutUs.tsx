import { Card, Tooltip } from 'antd';

import { useIntl } from 'react-intl';
import { History } from './components/History';
import {
  HomeFilled,
  ShopFilled,
  PhoneFilled,
  FireFilled,
  ClockCircleFilled,
  AuditOutlined,
  MailFilled,
  GlobalOutlined,
  PrinterFilled,
} from '@ant-design/icons';
import { Vision } from './components/Vision';

import './AboutUs.less';

const AboutUs = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="aboutUs">
      <div className='title'>Lịch sử hình thành</div>
      <div className="historyBlock">
        <History />
        <div className="description">
          <div>
            CÔNG TY CP CHIẾU SÁNG & THIẾT BỊ ĐIỆN ĐẠI VIỆT được thành lập năm 2015; tiền thân là Công ty thi công xây
            dựng ME cho các công trình, nhà xưởng, nhà cao tầng từ năm 2005; trong quá trình hoạt động và phát triển
            được chuyển thành Công ty CP Chiếu sáng & Thiết bị điện ĐẠI VIỆT, cùng song hành và đồng sở hữu với Công ty
            TNHH Thương mại – Xây dựng Điện công nghiệp THIÊN ÂN và Công ty TNHH Sản xuất – Thương mại Thiết bị điện KIM
            SANG hình thành nên Group ĐẠI VIỆT với các chức năng chuyên môn bao gồm :
          </div>
          <ul>
            <li>Đèn led Đại Việt dùng cho tòa nhà văn phòng, cao ốc, chung cư;</li>
            <li>
              Đèn led Đại Việt trang trí hoa viên, quảng trường, công viên, khu resort, trang trí cho dự án chung cư...
            </li>
            <li>
              Đèn Led chiếu sáng Đường phố (Street light) công suất từ 75W-250W tính năng đặc biệt: điều khiển đa cấp
              theo thời gian, cảm biến chuyển động. Sản phẩm mẫu mã đa đạng, sang trọng phù hợp từng tỉnh thành, vùng
              miền và đặc biệt cho vùng duyên hải.
            </li>
            <li>
              Trụ đèn chiếu sáng công cộng sản xuất theo thiết kế, đa đạng về mẫu mã, bảo đảm chất lượng tiêu chuẩn
              nguyên liệu & kỹ thuật sơn phun.
            </li>
            <li>Ngoài ra, công ty là đại lý cho các nhà sản xuất cáp điện, thiết bị điện trong và ngoài nước. </li>
          </ul>
          <div>
            Công ty cổ phần Chiếu sáng & TBĐ Đại Việt: Giấy chứng nhận đăng ký doanh nghiệp số: 0313154752 do Sở Kế
            hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 10 tháng 3 năm 2015; Đăng ký thay đổi lần thứ: 2, ngày 14
            tháng 12 năm 2017.
          </div>
          <div>
            Group Đại Việt với hơn 150 nhân viên giàu nhiệt huyết và cùng một ý chí phấn đấu, nỗ lực đáp ứng khách hàng
            cách hiệu quả nhất, đem lại lợi ích cho khách hàng nhiều nhất và đạt được sự hài lòng của khách hàng tốt
            nhất, cùng tiêu chí xem sự hài lòng của khách hàng là sự phát triển bền vững và tồn tại của Công ty; phục vụ
            khách hàng với phương châm: “THỰC TÌNH – TẬN TÂM – TRUNG TÍN” xem sự thành công của khách hàng là thành công
            của Công ty.
          </div>
        </div>
      </div>
      <div className='visionBlock'>
        <Card title={intl.formatMessage({ id: 'contact.company.title' })} className="companyInfo">
          <p>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.address' })}>
              <span className="icon">
                <HomeFilled />
              </span>
            </Tooltip>
            103 Nguyễn Cữu Đàm, P. Tân Sơn Nhì, Q. Tân Phú, Tp. HCM
          </p>
          <p>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.showroom' })}>
              <span className="icon">
                <ShopFilled />
              </span>
            </Tooltip>
            93D Bờ Bao Tân Thắng, P.Sơn Kỳ, Q. Tân Phú, Tp. HCM
          </p>
          <p>
            <span>
              <Tooltip title={intl.formatMessage({ id: 'contact.company.phone' })}>
                <span className="icon">
                  <PhoneFilled />
                </span>
              </Tooltip>
              028.38428991
            </span>{' '}
            -
            <span>
              <Tooltip title={intl.formatMessage({ id: 'contact.company.fax' })}>
                <span className="icon">
                  <PrinterFilled />
                </span>
              </Tooltip>
              02838428992
            </span>{' '}
            -
            <span>
              <Tooltip title={intl.formatMessage({ id: 'contact.company.taxId' })}>
                <span className="icon">
                  <AuditOutlined />
                </span>
              </Tooltip>
              0313154752
            </span>
          </p>
          <p>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.hotline' })}>
              <span className="icon">
                <FireFilled />
              </span>
            </Tooltip>
            090.233.2665 - 090.909.3426
          </p>
          <p>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.workingTime' })}>
              <span className="icon">
                <ClockCircleFilled />
              </span>
            </Tooltip>
            8h00 - 17h00 (Thứ 2 - Thứ 7)
          </p>
          <p>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.email' })}>
              <span className="icon">
                <MailFilled />
              </span>
            </Tooltip>
            capdaiviet@gmail.com
          </p>
          <p>
            <Tooltip title={intl.formatMessage({ id: 'contact.company.website' })}>
              <span className="icon">
                <GlobalOutlined />
              </span>
            </Tooltip>
            www.leddaiviet.com - www.daiviet-e.com
          </p>
        </Card>
        <div className='visionInfo'>
          <Vision />
          <div className='cooperation'>
            <div className='title'>Tiêu chí  hợp tác:</div>
            <ul>
              <li>Luôn nâng cao chuyên môn, xây dựng đội ngũ chuyên nghiệp.</li>
              <li>Mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất, nhanh nhất.</li>
              <li>Tạo mối quan hệ bền vững với khách hàng.</li>
              <li>Thiết lập, tìm kiếm những đối tác uy tín, hợp tác lâu dài, bền vững.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
