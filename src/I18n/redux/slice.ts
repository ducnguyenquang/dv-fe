import { createSlice } from '@reduxjs/toolkit';
import { storage } from 'utils';
import { DEFAULT_LOCALE } from 'constants/locales';

const language = storage.getLanguage();

export const initialState = {
  language: language ? JSON.parse(language) : DEFAULT_LOCALE,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      storage.setLanguage(JSON.stringify(payload));
      state.language = payload;
    },
  },
});

export const { name, actions, reducer } = languageSlice;
