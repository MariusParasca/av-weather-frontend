import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Humidity } from 'svgs/humidity.svg';
import { ReactComponent as Precipitation } from 'svgs/precipitation.svg';
import { ReactComponent as UvIndex } from 'svgs/uvIndex.svg';
import { ReactComponent as Cloud } from 'svgs/cloud.svg';

import WithSvg from 'components/WithSvg/WithSvg';
import { MAX_UV, MAX_PRESSURE, MAX_VISIBILITY, MAX_DEW_POINT } from 'constants/constants';
import Spinner from 'components/Spinner/Spinner';
import RightBottomContainer from 'components/RightBottomContainer/RightBottomContainer';
import Wind from 'components/Wind/Wind';
import { SET_FAVORITE_WEATHER_INFO } from 'store/actionTypes/userSettingsActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import styles from './TodayWeatherInfo.module.css';
import AirGauge from 'components/AirGauge/AirGauge';

const TodayWeatherInfo = props => {
  const { weatherInfo, isLoading } = props;

  const { maxWind, humidity, precipitation, uvIndex, cloudCover, pressure, visibility, dewPoint } = weatherInfo;

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  const userFavoriteWeatherInfo = useSelector(state => state.userSettings.favoriteWeatherInfo);

  const onClickItem = useCallback(
    (index, progressValue, text, svg, withPercent, progressText) => {
      const newItems = [...items];
      newItems[index] = { ...userFavoriteWeatherInfo };
      setItems(newItems);
      dispatch({ type: SET_FAVORITE_WEATHER_INFO, progressValue, text, svg, withPercent, progressText });
    },
    [dispatch, items, userFavoriteWeatherInfo],
  );

  useEffect(() => {
    if (weatherInfo) {
      setItems([
        {
          progressValue: humidity * 100,
          text: 'Humidity',
          svg: Humidity,
          withPercent: true,
        },
        {
          progressValue: precipitation * 100,
          text: 'Precipitation',
          svg: Precipitation,
          withPercent: true,
        },
        {
          progressValue: (uvIndex / MAX_UV) * 100,
          progressText: String(uvIndex),
          text: 'UV index',
          svg: UvIndex,
        },
        {
          progressValue: cloudCover * 100,
          text: 'Cloud cover',
          svg: Cloud,
          withPercent: true,
        },
        {
          progressValue: (pressure / MAX_PRESSURE) * 100,
          progressText: String(Math.round(pressure)),
          text: 'Pressure',
          svg: UvIndex,
        },
        {
          progressValue: (visibility / MAX_VISIBILITY) * 100,
          progressText: `${Math.round(visibility)}km`,
          text: 'Visibility',
          svg: Precipitation,
        },
        {
          progressValue: (dewPoint < 0 ? -1 : 1) * (dewPoint / MAX_DEW_POINT) * 100,
          progressText: `${Number(dewPoint).toFixed(2)}°`,
          text: 'Dew Point',
          svg: Precipitation,
        },
      ]);
    }
  }, [cloudCover, dewPoint, humidity, precipitation, pressure, uvIndex, visibility, weatherInfo]);

  return isLoading ? (
    <Spinner />
  ) : (
    <RightBottomContainer>
      <Wind maxWind={maxWind} />
      <div className={styles.otherContainer}>
        {items.map((item, index) =>
          item.progressValue || item.text ? (
            <WeatherInfo
              key={item.text}
              onClick={() =>
                onClickItem(index, item.progressValue, item.text, item.svg, item.withPercent, item.progressText)
              }
              progressValue={item.progressValue}
              text={item.text}
              withPercent={item.withPercent}
              progressText={item.progressText}
            >
              <WithSvg component={item.svg} size={20} />
            </WeatherInfo>
          ) : (
            <AirGauge
              key="airGauge"
              onClick={() =>
                onClickItem(index, item.progressValue, item.text, item.svg, item.withPercent, item.progressText)
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
          ),
        )}
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
