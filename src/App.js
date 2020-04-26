import React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { isLoaded } from 'react-redux-firebase';

import RequestComponent from 'components/RequestComponent/RequestComponent';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { useSelector } from 'react-redux';
import Spinner from 'components/Spinner/Spinner';

const App = () => {
  const auth = useSelector(state => state.firebase.auth);

  if (isLoaded(auth)) {
    return (
      <ErrorBoundary>
        <CssBaseline />
        <RequestComponent />
      </ErrorBoundary>
    );
  }
  return <Spinner />;
};

export default App;
