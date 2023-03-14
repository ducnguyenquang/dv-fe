import { Image } from 'antd';
import './Logo.less';
import { Context as AppContext } from 'app/context/appContext';
import { useContext, useMemo } from 'react';
import { SETTINGS } from 'constants/common';
import { Link } from 'react-router-dom';

const Logo = (): JSX.Element => {
  const { settingTemplate } = useContext(AppContext);
  const logoIcon = useMemo(() => {
    if (settingTemplate) {
      return (settingTemplate as any)?.find((item: any) => item.name === SETTINGS.LOGO)
    }
  }, [settingTemplate])
  
  return <Link to={'/'} className='logo'><Image preview={false} src={logoIcon?.valueImages?.[0]?.url || "/images/logodv-8769.gif"} /></Link>
}

export default Logo;
