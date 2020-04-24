import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import { isCorrectRoute } from 'utils/helperFunctions';
import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import SearchBox from 'components/SearchBox/SearchBox';
import { topContainerRoutes } from 'constants/routes';

import { SEARCH_PLACEHOLDER } from 'constants/constants';
import Spinner from 'components/Spinner/Spinner';
import { PageRoute } from 'utils/routes';
import { store } from 'store/store';
import styles from './RequestComponent.module.css';

const getSettingsDefaultViewUrl = () => {
  return store.getState().userSettings && store.getState().userSettings.settings
    ? store.getState().userSettings.settings.defaultView.url
    : '/';
};

const RequestComponent = props => {
  const { location } = props;

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: WEATHER_API_SEND });
  }, [dispatch, location.pathname]);

  useEffect(() => {
    history.push(getSettingsDefaultViewUrl());
  }, [history]);

  return (
    <>
      {false ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.app}>
            <ApplicationBar />
            <Main />
          </div>
          {isCorrectRoute(topContainerRoutes, location.pathname) && location.pathname !== PageRoute.home && (
            <SearchBox placeholder={SEARCH_PLACEHOLDER} className={styles.searchBox} />
          )}
        </>
      )}
    </>
  );
};

RequestComponent.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(RequestComponent);
