import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from 'store/reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'userSettings'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, undefined, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);

export { store, persistor, sagaMiddleware };
