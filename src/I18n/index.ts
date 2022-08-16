import { DEFAULT_LOCALE } from 'constants/locales';
import { languageSelectors } from './redux/selectors';

import enTranslationMessages from './locales/en.json';
import viTranslationMessages from './locales/vi.json';

type Obj = {
  [key: string]: string;
};

type TTranslationMessages = {
  [key: string]: Obj;
};

const formatTranslationMessages = (locale: string, messages: Obj): Obj => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};

  const flattenFormattedMessages = (formattedMessages: Obj, key: string): Obj => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];

    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };

  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages: TTranslationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  vi: formatTranslationMessages('vi', viTranslationMessages),
};

export { formatTranslationMessages };
export { languageSelectors };

export default translationMessages;
