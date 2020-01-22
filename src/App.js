import React from 'react';

import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <ApplicationBar />
      <Main />
    </div>
  );
}

export default App;
