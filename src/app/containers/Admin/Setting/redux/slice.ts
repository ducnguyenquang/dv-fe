import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  tagSeoPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  tagSeos: [],
  tagSeoDetail: {},
  
  popupMenuPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  popupMenus: [],
  popupMenuDetail: {},

  emailTemplatePagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  emailTemplates: [],
  emailTemplateDetail: {},
  
  advertisementPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  advertisements: [],
  advertisementDetail: {},
};

const settingsSlice = createSlice({
  name: 'adminSettings',
  initialState,
  reducers: {
    setTagSeosPagination: (state, { payload }) => {
      state.tagSeoPagination = payload.pagination;
    },
    setTagSeos: (state, { payload }) => {
      state.tagSeos = payload.data;
      state.tagSeoPagination = payload.pagination;
    },
    setTagSeoDetail: (state, { payload }) => {
      state.tagSeoDetail = payload;
    },

    setPopupMenusPagination: (state, { payload }) => {
      state.popupMenuPagination = payload.pagination;
    },
    setPopupMenus: (state, { payload }) => {
      state.popupMenus = payload.data;
      state.popupMenuPagination = payload.pagination;
    },
    setPopupMenuDetail: (state, { payload }) => {
      state.popupMenuDetail = payload;
    },
    
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

    setAdvertisementsPagination: (state, { payload }) => {
      state.advertisementPagination = payload.pagination;
    },
    setAdvertisements: (state, { payload }) => {
      state.advertisements = payload.data;
      state.advertisementPagination = payload.pagination;
    },
    setAdvertisementDetail: (state, { payload }) => {
      state.advertisementDetail = payload;
    },
    
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { name, actions, reducer } = settingsSlice;
