export const DEFAULT_LOCALE = 'en';
export const APP_LOCALES = ['en', 'de', 'vi'];

export enum LanguageOptions {
  de = 'de',
  en = 'en',
  vi = 'vi',
}

export const LANGUAGE_DROPDOWN_OPTIONS = [
  {
    label: 'languages.german',
    value: LanguageOptions.de,
  },
  {
    label: 'languages.english',
    value: LanguageOptions.en,
  },
  {
    label: 'languages.vietnam',
    value: LanguageOptions.vi,
  },
];
