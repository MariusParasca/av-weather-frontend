import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import { LOGIN_CHECK } from 'store/actionTypes/authActionTypes';
import { topContainerRoutes } from 'constants/routes';
import { isCorrectRoute } from 'utils/helperFunctions';
import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import SearchBox from 'components/SearchBox/SearchBox';

import { SEARCH_PLACEHOLDER } from 'constants/constants';
import Spinner from 'components/Spinner/Spinner';
import { PageRoute } from 'utils/routes';
import { store } from 'store/store';
import styles from './RequestComponent.module.css';

const searchTopContainers = [...topContainerRoutes];
searchTopContainers.push(PageRoute.map);

const getSettingsDefaultViewUrl = () => {
  return store.getState().userSettings ? store.getState().userSettings.settings.defaultView.url : '/';
};

const RequestComponent = props => {
  const { location } = props;

  const dispatch = useDispatch();
  const locationData = useSelector(state => state.data.ipStack);
  const weatherData = useSelector(state => state.data.weather);
  const pending = useSelector(state => state.data.pending);
  const pendingCheckLogin = useSelector(state => state.authData.pending);

  const history = useHistory();

  useEffect(() => {
    // isCorrectRoute(searchTopContainers, location.pathname) &&
    if (!pendingCheckLogin) {
      dispatch({ type: WEATHER_API_SEND });
    }
  }, [dispatch, location.pathname, pendingCheckLogin]);

  useEffect(() => {
    dispatch({ type: LOGIN_CHECK });
  }, [dispatch]);

  useEffect(() => {
    history.push(getSettingsDefaultViewUrl());
  }, [history]);

  return (
    <>
      {pendingCheckLogin ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.app}>
            <ApplicationBar />
            <Main locationData={locationData} weatherData={weatherData} pending={pending} />
          </div>
          {isCorrectRoute(searchTopContainers, location.pathname) && location.pathname !== PageRoute.home && (
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
