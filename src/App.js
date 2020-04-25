import React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import RequestComponent from 'components/RequestComponent/RequestComponent';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const App = () => {
  // useFirestoreConnect([
  //   { collection: 'locations' }, // or 'todos'
  // ]);
  // const todos = useSelector(state => state.firestore.ordered.locations);

  // console.log('todos', todos);

  return (
    <ErrorBoundary>
      <CssBaseline />
      <RequestComponent />
    </ErrorBoundary>
  );
};

export default App;
