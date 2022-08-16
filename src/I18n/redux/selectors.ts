import type { RootState } from 'config/configureStore';
import { LanguageOptions } from 'constants/locales';

const getLanguage = (state: RootState): LanguageOptions => state?.language?.language;

export const languageSelectors = {
  getLanguage,
};
