import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { basename } from 'utils/routes';
import { Provider } from 'react-redux';
import store from 'store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

import theme from './theme';

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
