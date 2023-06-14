import { createSlice } from '@reduxjs/toolkit';
import { storage } from 'utils';

export const initialState = {
  isLoading: false,
  currentUser: '',
  accessToken: '',
  avatarUser: '',
  clientCurrentUser: '',
  clientAccessToken: '',
};

const authenticationSlice = createSlice({
  name: 'adminAuthentications',
  initialState,
  reducers: {
    setClientCurrentUser: (state, { payload }) => {
      const user = {
        ...payload,
        images: undefined,
      };

      state.clientCurrentUser = JSON.stringify(user);
      state.clientAccessToken = payload.token;

      storage.setClientCurrentUser(JSON.stringify(user));
      
      storage.setClientAccessToken(state.accessToken);
      // const storedData = sessionStorage.setItem('myData', payload.images?.[0]);
      storage.setAvatarUser(JSON.stringify(payload.images));
    },
    setCurrentUser: (state, { payload }) => {
      const user = {
        ...payload,
        images: undefined,
      };

      state.currentUser = JSON.stringify(user);
      state.accessToken = payload.token;

      storage.setCurrentUser(JSON.stringify(user));
      
      storage.setAccessToken(state.accessToken);
      // const storedData = sessionStorage.setItem('myData', payload.images?.[0]);
      storage.setAvatarUser(JSON.stringify(payload.images));
    },
    setAccessToken: (state, { payload }) => {
      storage.setAccessToken(payload);
      state.accessToken = payload;
    },
    logout: state => {
      storage.clear();
      state.accessToken = '';
      state.currentUser = '';
      state.clientCurrentUser = '';
      state.clientAccessToken = '';
    },
  },
});

export const { name, actions, reducer } = authenticationSlice;
