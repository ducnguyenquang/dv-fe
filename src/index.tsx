import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import * as serviceWorker from 'serviceWorker';

import './index.css';
// import App from './App';
import { App } from '../src/app';

import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from './store/configureStore';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

const store = configureAppStore();
// const store = null;
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  // <Provider store={store}>
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  </Provider>
  ,MOUNT_NODE
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
