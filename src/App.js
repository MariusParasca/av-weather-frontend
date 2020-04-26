import React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import RequestComponent from 'components/RequestComponent/RequestComponent';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const App = () => {
  useFirestoreConnect([
    { collection: 'users' }, // or 'todos'
  ]);
  const todos = useSelector(state => state.firestore.ordered.users);

  console.log('isLoaded(todos', isLoaded(todos));
  console.log('todos', todos);

  return (
    <ErrorBoundary>
      <CssBaseline />
      <RequestComponent />
    </ErrorBoundary>
  );
};

export default App;
