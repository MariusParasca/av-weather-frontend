import React, { useEffect } from 'react';

import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import SearchBox from 'components/SearchBox/SearchBox';
import ipStackAxios from 'axios/ipStack';
import useHttp from 'hooks/useHttp';
import styles from './App.module.css';

function App() {
  const ipStackHttp = useHttp();
  const { sendRequest: sendRequestIpStack } = ipStackHttp;

  useEffect(() => {
    sendRequestIpStack(ipStackAxios, ['/check'], 'get');
  }, [sendRequestIpStack]);

  return (
    <>
      <div className={styles.app}>
        <ApplicationBar />
        <Main ipStackHttp={ipStackHttp} />
      </div>
      <SearchBox ipStackHttp={ipStackHttp} placeholder="City, postcode or place" className={styles.searchBox} />
    </>
  );
}

export default App;
