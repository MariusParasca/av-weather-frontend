import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { WIND_WEATHER_TYPE } from 'constants/constants';

import Spinner from 'components/Spinner/Spinner';
import RightBottomContainer from 'components/RightBottomContainer/RightBottomContainer';
import Wind from 'components/Wind/Wind';
import WithSvg from 'components/WithSvg/WithSvg';
import { SET_FAVORITE_WEATHER_INFO, SET_FAVORITE_WEATHER_INFO_DATA } from 'store/actionTypes/userSettingsActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import styles from './TodayWeatherInfo.module.css';
import HomeAdditional from 'routes/Home/HomeAdditional/HomeAdditional';

const TodayWeatherInfo = props => {
  const { isLoading } = props;

  const dispatch = useDispatch();

  const userSettings = useSelector(state => state.userSettings);
  const userFavoriteWeatherInfo = userSettings.favoriteWeatherInfoLocally;
  const userWeatherData = userSettings.data;

  const onClickItem = useCallback(
    (index, progressValue, text, svg, withPercent, progressText, weatherType) => {
      const newItems = [...userWeatherData];
      newItems[index] = { ...userFavoriteWeatherInfo };
      dispatch({ type: SET_FAVORITE_WEATHER_INFO, progressValue, text, svg, withPercent, progressText, weatherType });
      dispatch({ type: SET_FAVORITE_WEATHER_INFO_DATA, data: newItems });
    },
    [dispatch, userFavoriteWeatherInfo, userWeatherData],
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <RightBottomContainer className={styles.mainContainer}>
      <HomeAdditional/>
      <div className={styles.otherContainer}>
        {userWeatherData.map((item, index) => {
          if (item.weatherType === WIND_WEATHER_TYPE) {
            return (
              <Wind
                key="wind"
                onClick={() =>
                  onClickItem(
                    index,
                    item.progressValue,
                    item.text,
                    item.svg,
                    item.withPercent,
                    item.progressText,
                    item.weatherType,
                  )
                }
                maxWind={item.progressValue}
              />
            );
          }
          return (
            <WeatherInfo
              key={item.text}
              onClick={() =>
                onClickItem(
                  index,
                  item.progressValue,
                  item.text,
                  item.svg,
                  item.withPercent,
                  item.progressText,
                  item.weatherType,
                )
              }
              progressValue={item.progressValue}
              text={item.text}
              withPercent={item.withPercent}
              progressText={item.progressText}
            >
              <WithSvg component={item.svg} size={20} />
            </WeatherInfo>
          );
        })}
      </div>
    </RightBottomContainer>
  );
};

TodayWeatherInfo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default TodayWeatherInfo;
