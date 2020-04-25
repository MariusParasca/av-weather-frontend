import React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import RequestComponent from 'components/RequestComponent/RequestComponent';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import { useFirebaseConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const App = () => {
  // useFirebaseConnect([{ path: 'todo' }]);
  // const todos = useSelector(state => state.firebase.data.todo);

  // console.log('todos', todos);

  return (
    <ErrorBoundary>
      <CssBaseline />
      <RequestComponent />
    </ErrorBoundary>
  );
};

export default App;
