import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  pagination: {
    hasPreviousPage: false,
    hasNextPage: false,
    totalCount: 0,
    count: 0,
  },
  projects: [],
  projectDetail: {},
};

const projectsSlice = createSlice({
  name: 'adminProjects',
  initialState,
  reducers: {
    setProjectsPagination: (state, { payload }) => {
      // state.projects = payload.data;
      state.pagination = payload.pagination;
    },
    setProjects: (state, { payload }) => {
      state.projects = payload.data;
      state.pagination = payload.pagination;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setProjectDetail: (state, { payload }) => {
      // console.log('==== setProjectDetail', payload)
      state.projectDetail = payload;
    },
  },
});

export const { name, actions, reducer } = projectsSlice;
