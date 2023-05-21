import { createContext } from 'react';

interface IAppContextProps {
  orientation?: string;
  isMobile?: boolean;
  settingTemplate?: any;
}

export const Context = createContext<IAppContextProps>({
  orientation: '',
  isMobile: false,
  // logoIcon: 'images/logodv-8769.gif',
  settingTemplate: undefined,
});