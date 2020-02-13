import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { PageRoute } from 'utils/routes';
import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import SearchBox from 'components/SearchBox/SearchBox';
import ipStackAxios from 'axios/ipStack';
import useHttp from 'hooks/useHttp';
import styles from './App.module.css';

const App = props => {
  const { location } = props;

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
      {!location.pathname.includes(PageRoute.favorites) && (
        <SearchBox ipStackHttp={ipStackHttp} placeholder="City, postcode or place" className={styles.searchBox} />
      )}
    </>
  );
};

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(App);
