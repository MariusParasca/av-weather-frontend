import React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import RequestComponent from 'components/RequestComponent/RequestComponent';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const App = () => {

  return (
    <ErrorBoundary>
      <CssBaseline />
      <RequestComponent />
    </ErrorBoundary>
  );
};

export default App;
