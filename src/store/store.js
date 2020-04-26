import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { createFirestoreInstance, reduxFirestore } from 'redux-firestore';
import { compose } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from 'store/reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'userSettings'],
};

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

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  {},
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(sagaMiddleware), reduxFirestore(fbConfig))
    : compose(applyMiddleware(sagaMiddleware), reduxFirestore(fbConfig)),
);
const persistor = persistStore(store);

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

export { store, persistor, sagaMiddleware, rrfProps };
