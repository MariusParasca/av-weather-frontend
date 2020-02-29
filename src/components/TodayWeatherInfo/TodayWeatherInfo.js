import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Humidity } from 'svgs/humidity.svg';
import { ReactComponent as Precipitation } from 'svgs/precipitation.svg';
import { ReactComponent as UvIndex } from 'svgs/uvIndex.svg';
import { ReactComponent as Cloud } from 'svgs/cloud.svg';

import WithSvg from 'components/WithSvg/WithSvg';
import {
  MAX_UV,
  MAX_PRESSURE,
  MAX_VISIBILITY,
  MAX_DEW_POINT,
  AIR_WEATHER_TYPE,
  STANDARD_WEATHER_TYPE,
  WIND_WEATHER_TYPE,
} from 'constants/constants';
import Spinner from 'components/Spinner/Spinner';
import RightBottomContainer from 'components/RightBottomContainer/RightBottomContainer';
import Wind from 'components/Wind/Wind';
import { SET_FAVORITE_WEATHER_INFO } from 'store/actionTypes/userSettingsActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import AirGauge from 'components/AirGauge/AirGauge';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import styles from './TodayWeatherInfo.module.css';

const TodayWeatherInfo = props => {
  const { weatherInfo, isLoading } = props;

  const { maxWind, humidity, precipitation, uvIndex, cloudCover, pressure, visibility, dewPoint } = weatherInfo;

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  const userFavoriteWeatherInfo = useSelector(state => state.userSettings.favoriteWeatherInfo);

  const onClickItem = useCallback(
    (index, progressValue, text, svg, withPercent, progressText, weatherType) => {
      const newItems = [...items];
      newItems[index] = { ...userFavoriteWeatherInfo };
      setItems(newItems);
      dispatch({ type: SET_FAVORITE_WEATHER_INFO, progressValue, text, svg, withPercent, progressText, weatherType });
    },
    [dispatch, items, userFavoriteWeatherInfo],
  );

  useEffect(() => {
    if (weatherInfo) {
      setItems([
        {
          progressValue: maxWind,
          weatherType: WIND_WEATHER_TYPE,
        },
        {
          progressValue: humidity * 100,
          text: 'Humidity',
          svg: Humidity,
          withPercent: true,
          weatherType: STANDARD_WEATHER_TYPE,
        },
        {
          progressValue: precipitation * 100,
          text: 'Precipitation',
          svg: Precipitation,
          withPercent: true,
          weatherType: STANDARD_WEATHER_TYPE,
        },
        {
          progressValue: (uvIndex / MAX_UV) * 100,
          progressText: String(uvIndex),
          text: 'UV index',
          svg: UvIndex,
          weatherType: STANDARD_WEATHER_TYPE,
        },
        {
          progressValue: cloudCover * 100,
          text: 'Cloud cover',
          svg: Cloud,
          withPercent: true,
          weatherType: STANDARD_WEATHER_TYPE,
        },
        {
          progressValue: (pressure / MAX_PRESSURE) * 100,
          progressText: String(Math.round(pressure)),
          text: 'Pressure',
          svg: UvIndex,
          weatherType: STANDARD_WEATHER_TYPE,
        },
        {
          progressValue: (visibility / MAX_VISIBILITY) * 100,
          progressText: `${Math.round(visibility)}km`,
          text: 'Visibility',
          svg: Precipitation,
          weatherType: STANDARD_WEATHER_TYPE,
        },
        {
          progressValue: (dewPoint < 0 ? -1 : 1) * (dewPoint / MAX_DEW_POINT) * 100,
          progressText: `${Number(dewPoint).toFixed(2)}°`,
          text: 'Dew Point',
          svg: Precipitation,
          weatherType: STANDARD_WEATHER_TYPE,
        },
      ]);
    }
  }, [cloudCover, dewPoint, maxWind, humidity, precipitation, pressure, uvIndex, visibility, weatherInfo]);

  return isLoading ? (
    <Spinner />
  ) : (
    <RightBottomContainer>
      <div className={styles.otherContainer}>
        {items.map((item, index) => {
          if (item.weatherType === AIR_WEATHER_TYPE) {
            return (
              <AirGauge
                key="airGauge"
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
                className={styles.airGauge}
                classNameTypo={styles.typoAirGauge}
                pointerWidth={2}
                stroke={9}
                width={80}
                height={90}
                showDetail={false}
                airQuality={item.progressValue}
                showCustomLabel
              />
            );
          }
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
  weatherInfo: PropTypes.shape({
    maxWind: PropTypes.number,
    humidity: PropTypes.number,
    precipitation: PropTypes.number,
    uvIndex: PropTypes.number,
    cloudCover: PropTypes.number,
    pressure: PropTypes.number,
    visibility: PropTypes.number,
    dewPoint: PropTypes.number,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TodayWeatherInfo;
