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
  popupMenuOpened: false,

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

  topMenuPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  topMenus: [],
  topMenuDetail: {},

  skuPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  skus: [],
  skuDetail: {},

  routePathPagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  routePaths: [],
  routePathDetail: {},
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
    setPopMenuOpened: (state, { payload }) => {
      state.popupMenuOpened = payload;
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
    
    setTopMenusPagination: (state, { payload }) => {
      state.topMenuPagination = payload.pagination;
    },
    setTopMenus: (state, { payload }) => {
      state.topMenus = payload.data;
      state.topMenuPagination = payload.pagination;
    },
    setTopMenuDetail: (state, { payload }) => {
      state.topMenuDetail = payload;
    },

    setSkusPagination: (state, { payload }) => {
      state.skuPagination = payload.pagination;
    },
    setSkus: (state, { payload }) => {
      state.skus = payload.data;
      state.skuPagination = payload.pagination;
    },
    setSkuDetail: (state, { payload }) => {
      state.skuDetail = payload;
    },

    setRoutePathsPagination: (state, { payload }) => {
      state.routePathPagination = payload.pagination;
    },
    setRoutePaths: (state, { payload }) => {
      state.routePaths = payload.data;
      state.routePathPagination = payload.pagination;
    },
    setRoutePathDetail: (state, { payload }) => {
      state.routePathDetail = payload;
    },

    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { name, actions, reducer } = settingsSlice;
