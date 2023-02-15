import { Image } from 'antd';
import './FooterCerts.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext } from 'react';

const FooterCerts = (): JSX.Element => {
  const { isMobile } = useContext(AppContext);

  return (
    <div className={`certs ${isMobile && 'certs-mobile'}`}>
      <div className="cert">
        <Image width={100} preview={false} src="/images/iso-9001-2008.jpeg" />
      </div>
      <div className="bocongthuong">
        <Image width={100} preview={false} src="/images/bocongthuong-thongbao.png" />
        <Image width={100} preview={false} src="/images/bocongthuong-dangky.png" />
      </div>
    </div>
  );
};
export default FooterCerts;
