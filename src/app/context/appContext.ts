import { createContext } from 'react';

interface IAppContextProps {
  orientation?: string;
  isMobile?: boolean;
  settingTemplate?: any;
  currentUser?: any;
  avatarUser?: any;
  token?: string;
}

export const Context = createContext<IAppContextProps>({
  orientation: '',
  isMobile: false,
  // logoIcon: 'images/logodv-8769.gif',
  settingTemplate: undefined,
  currentUser: {},
  avatarUser: {},
  token: '',
});