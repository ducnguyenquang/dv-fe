import React, { memo, useEffect, useRef } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import translationMessages, { languageSelectors } from 'I18n';
import { DEFAULT_LOCALE } from 'constants/locales';
// import { authActions, authSelectors } from 'Components/Auth';
// import { storage, getTokenRefreshTimeout } from 'Utils';

interface IProps {
  children: React.ReactNode;
}

const LanguageProvider = ({ children }: IProps) => {
  // const refreshIntervalRef = useRef<NodeJS.Timer | null>(null);
  // TODO: get user langugage from BE
  // const userLanguage = useSelector(authSelectors.getUserLanguage);
  const userLanguage: string = useSelector(languageSelectors.getLanguage);
  // const isUserAuthenticated = useSelector(authSelectors.isUserAuthenticated);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isUserAuthenticated && process.env.REACT_APP_COGNITO !== 'true') {
  //     // TODO: Move to redux
  //     // Start refreshing token if token exists (on page refresh)
  //     const token = storage.getAuthToken();
  //     const refreshTimeout = getTokenRefreshTimeout(token);

  //     refreshIntervalRef.current = setInterval(() => {
  //       dispatch(authActions.renewToken());
  //     }, refreshTimeout);

  //     // Get current user if token exists (on page refresh)
  //     dispatch(authActions.fetchCurrentUser());
  //   }

  //   return () => {
  //     if (refreshIntervalRef.current) {
  //       clearInterval(refreshIntervalRef.current);
  //     }
  //   };
  // }, [dispatch, isUserAuthenticated]);

  return (
    <IntlProvider locale={userLanguage} messages={translationMessages[userLanguage]} defaultLocale={DEFAULT_LOCALE}>
      {children}
    </IntlProvider>
  );
};

export default memo(LanguageProvider);
