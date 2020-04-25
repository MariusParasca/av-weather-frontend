import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { basename } from 'utils/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactNotification from 'react-notifications-component';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import 'react-notifications-component/dist/theme.css';
import sagaRoot from 'sagas';
import { store, persistor, sagaMiddleware } from 'store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

import theme from './theme';

const fbConfig = {
  apiKey: 'AIzaSyCAJTKRmN6midO13QfdSHMzdHbNnmJtuhc',
  authDomain: 'av-weather-53882.firebaseapp.com',
  databaseURL: 'https://av-weather-53882.firebaseio.com',
  projectId: 'av-weather-53882',
  storageBucket: 'av-weather-53882.appspot.com',
  messagingSenderId: '896818180379',
  appId: '1:896818180379:web:714f2d73ba5a6b06e8e3be',
  measurementId: 'G-RGT36Y5FVJ',
};

firebase.initializeApp(fbConfig);

firebase.firestore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

localStorage.clear();
sagaMiddleware.run(sagaRoot);

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <ReactNotification />
            <App />
          </ReactReduxFirebaseProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
