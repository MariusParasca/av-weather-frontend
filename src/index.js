import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { basename } from 'utils/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import sagaRoot from 'sagas';
import { store, persistor, sagaMiddleware, rrfProps } from 'store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

import theme from './theme';

localStorage.clear();
sagaMiddleware.run(sagaRoot);

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ReactReduxFirebaseProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
