import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  contacts: [],
  contactDetail: {},
};

const contactsSlice = createSlice({
  name: 'adminContacts',
  initialState,
  reducers: {
    setContactsPagination: (state, { payload }) => {
      state.pagination = payload.pagination;
    },
    setContacts: (state, { payload }) => {
      state.contacts = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setContactDetail: (state, { payload }) => {
      state.contactDetail = payload;
    },
  },
});

export const { name, actions, reducer } = contactsSlice;
