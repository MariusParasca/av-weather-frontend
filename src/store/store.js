import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { composeWithDevTools } from 'redux-devtools-extension';

import makeRootReducer from 'store/reducers';

const firebaseConfig = {
  apiKey: 'AIzaSyCAJTKRmN6midO13QfdSHMzdHbNnmJtuhc',
  authDomain: 'av-weather-53882.firebaseapp.com',
  databaseURL: 'https://av-weather-53882.firebaseio.com',
  projectId: 'av-weather-53882',
  storageBucket: 'av-weather-53882.appspot.com',
  messagingSenderId: '896818180379',
  appId: '1:896818180379:web:714f2d73ba5a6b06e8e3be',
  measurementId: 'G-RGT36Y5FVJ',
}; // firebase configuration including databaseURL

firebase.initializeApp(firebaseConfig);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'userSettings'],
};

const persistedReducer = persistReducer(persistConfig, makeRootReducer());
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, undefined, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);

export { store, persistor, sagaMiddleware };
