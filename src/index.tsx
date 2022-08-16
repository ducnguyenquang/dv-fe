import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
// import * as serviceWorker from 'serviceWorker';
import { ToastContainer, Slide } from 'react-toastify';
// import store from 'config/configureStore';
// import createInterceptors from 'config/axiosInterceptors';

import './index.css';
// import App from './App';
import { App } from '../src/app';

import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import store from './config/configureStore';

// import LanguageProvider from './app/components/LanguageProvider/LanguageProvider';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 1000 * 30,
      staleTime: 1000 * 10,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// const store = configureAppStore();
// createInterceptors(store);

// const store = null;
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  // <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <Provider store={store}>
      {/* <LanguageProvider> */}
      <HelmetProvider>
        {/* <React.StrictMode> */}
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          transition={Slide}
          draggable={false}
          pauseOnFocusLoss={false}
          limit={10}
        />
        <App />
        {/* </React.StrictMode> */}
      </HelmetProvider>
      {/* </LanguageProvider> */}
    </Provider>
  </QueryClientProvider>,
  MOUNT_NODE
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
