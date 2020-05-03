import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { createFirestoreInstance, reduxFirestore } from 'redux-firestore';

import { composeWithDevTools } from 'redux-devtools-extension';

import fbConfig from 'utils/fbConfig';
import reducers from 'store/reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'userSettings'],
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
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

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export { store, persistor, sagaMiddleware, rrfProps };
