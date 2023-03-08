import { createContext } from 'react';

interface IAppContextProps {
  orientation?: string;
  isMobile?: string;
  settingTemplate?: any;
}

export const Context = createContext({
  orientation: '',
  isMobile: false,
  // logoIcon: 'images/logodv-8769.gif',
  settingTemplate: undefined,
});