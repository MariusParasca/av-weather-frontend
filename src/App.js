import React from 'react';

import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import SearchBox from 'components/SearchBox/SearchBox';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.app}>
        <ApplicationBar />
        <Main />
      </div>
      <SearchBox placeholder="City, postcode or place" className={styles.searchBox} />
    </div>
  );
}

export default App;
