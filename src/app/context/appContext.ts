import { createContext } from 'react';

interface IAppContextProps {
  orientation?: string;
}

export const Context = createContext({
  orientation: '',
  isMobile: false,
});