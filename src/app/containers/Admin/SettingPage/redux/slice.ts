import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  templatePagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  templates: [],
  templateDetail: {},
  
  homePagePagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  homePages: [],
  homePageDetail: {},
};

const settingPagesSlice = createSlice({
  name: 'adminSettingPages',
  initialState,
  reducers: {
    setTemplatesPagination: (state, { payload }) => {
      state.templatePagination = payload.pagination;
    },
    setTemplates: (state, { payload }) => {
      state.templates = payload.data;
      state.templatePagination = payload.pagination;
    },
    setTemplateDetail: (state, { payload }) => {
      state.templateDetail = payload;
    },

    setHomePagesPagination: (state, { payload }) => {
      state.homePagePagination = payload.pagination;
    },
    setHomePages: (state, { payload }) => {
      state.homePages = payload.data;
      state.homePagePagination = payload.pagination;
    },
    setHomePageDetail: (state, { payload }) => {
      state.homePageDetail = payload;
    },
    
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { name, actions, reducer } = settingPagesSlice;
