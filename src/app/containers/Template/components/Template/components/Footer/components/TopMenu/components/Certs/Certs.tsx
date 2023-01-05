import { Image } from 'antd';
import { useIntl } from 'react-intl';
import './Certs.less';

const Certs = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="certs">
      <div className="cert">
        <Image width={150} preview={false} src="/images/iso-9001-2008.jpeg" />
      </div>
      <div className="bocongthuong">
        <Image width={150} preview={false} src="/images/bocongthuong-thongbao.png" />
        <Image width={150} preview={false} src="/images/bocongthuong-dangky.png" />
      </div>
    </div>
  );
};
export default Certs;
