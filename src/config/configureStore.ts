import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import createReducer from './rootReducer';

const middlewares = [] as any;

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}
const initialState = {};
const store = configureStore({
  reducer: createReducer(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
