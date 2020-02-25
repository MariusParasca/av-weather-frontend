import React from 'react';
// import PropTypes from 'prop-types';

import RequestComponent from 'components/RequestComponent/RequestComponent';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <RequestComponent />
    </ErrorBoundary>
  );
};

export default App;
