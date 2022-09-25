// import { Equipment, EquipmentFileView } from 'Models/equipment';
import { createSlice } from '@reduxjs/toolkit';
import { storage } from 'utils';

export const initialState = {
  isLoading: false,
  currentUser: {},
};

const authenticationSlice = createSlice({
  name: 'adminAuthentications',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { name, actions, reducer } = authenticationSlice;
