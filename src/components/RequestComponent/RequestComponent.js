import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { IP_STACK_API_SEND } from 'store/actionTypes/ipStackActionTypes';

import { PageRoute } from 'utils/routes';
import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import SearchBox from 'components/SearchBox/SearchBox';

import styles from './RequestComponent.module.css';

const RequestComponent = props => {
  const { location, locationData, ipStackSend } = props;

  useEffect(() => {
    ipStackSend();
  }, [ipStackSend]);

  return (
    <>
      <div className={styles.app}>
        <ApplicationBar />
        <Main ipStackHttp={{}} locationData={locationData} />
      </div>
      {!location.pathname.includes(PageRoute.favorites) && (
        <SearchBox ipStackHttp={{}} placeholder="City, postcode or place" className={styles.searchBox} />
      )}
    </>
  );
};

RequestComponent.propTypes = {};

const mapStateToProps = state => {
  return {
    locationData: state.location,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ipStackSend: () => dispatch({ type: IP_STACK_API_SEND }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestComponent));
