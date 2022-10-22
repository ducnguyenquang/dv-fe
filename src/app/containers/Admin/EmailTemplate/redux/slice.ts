import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  emailTemplatePagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  emailTemplates: [],
  emailTemplateDetail: {},
};

const emailTemplatesSlice = createSlice({
  name: 'adminEmailTemplates',
  initialState,
  reducers: {
    setEmailTemplatesPagination: (state, { payload }) => {
      state.emailTemplatePagination = payload.pagination;
    },
    setEmailTemplates: (state, { payload }) => {
      state.emailTemplates = payload.data;
      state.emailTemplatePagination = payload.pagination;
    },
    setEmailTemplateDetail: (state, { payload }) => {
      state.emailTemplateDetail = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { name, actions, reducer } = emailTemplatesSlice;
