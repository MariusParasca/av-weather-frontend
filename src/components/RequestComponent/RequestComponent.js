import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { getUid, getUserSettingsDB } from 'utils/stateGetters';
import { getSettingsQuery } from 'utils/firestoreQueries';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import styles from './RequestComponent.module.css';

const getSettingsDefaultViewUrl = () => {
  return store.getState().userSettings && store.getState().userSettings.settings
    ? store.getState().userSettings.settings.defaultView.url
    : '/';
};

const RequestComponent = props => {
  const { location } = props;

  const [isMount, setIsMount] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const uid = useSelector(getUid);

  useFirestoreConnect(getSettingsQuery(uid));

  const settingsDB = useSelector(getUserSettingsDB);

  useEffect(() => {
    if (uid) {
      if (isLoaded(settingsDB) && !isMount) {
        history.push(settingsDB.defaultView.url);
        setIsMount(true);
      }
    } else {
      history.push(getSettingsDefaultViewUrl());
    }
  }, [history, isMount, settingsDB, uid]);

  useEffect(() => {
    if (uid) {
      if (isLoaded(settingsDB)) dispatch({ type: WEATHER_API_SEND, defaultLocation: settingsDB.defaultLocation });
    } else {
      dispatch({ type: WEATHER_API_SEND });
    }
  }, [dispatch, location.pathname, settingsDB, uid]);

  return (
    <>
      {uid && !isLoaded(settingsDB) ? (
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
