import React, { useCallback, useState } from 'react';
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
import { SET_FAVORITE_WEATHER_INFO_SEND } from 'store/actionTypes/userSettingsActionTypes';
import { useDispatch } from 'react-redux';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import styles from './TodayWeatherInfo.module.css';

const TodayWeatherInfo = props => {
  const { weatherInfo, isLoading } = props;

  const { maxWind, humidity, precipitation, uvIndex, cloudCover, pressure, visibility, dewPoint } = weatherInfo;

  const dispatch = useDispatch();

  const onClickItem = useCallback((value, text, svg, withPercent, progressText) => {
    dispatch({ type: SET_FAVORITE_WEATHER_INFO_SEND, value, text, svg, withPercent, progressText });
  }, []);

  const [items, setItems] = useState([
    <WeatherInfo
      onClick={() => onClickItem(humidity * 100, 'Humidity', Humidity, true)}
      progressValue={humidity * 100}
      text="Humidity"
      withPercent
    >
      <WithSvg component={Humidity} size={20} />
    </WeatherInfo>,
    <WeatherInfo
      onClick={() => onClickItem(precipitation * 100, 'Precipitation', Precipitation, true)}
      progressValue={precipitation * 100}
      text="Precipitation"
      withPercent
    >
      <WithSvg component={Precipitation} size={20} />
    </WeatherInfo>,
    <WeatherInfo
      onClick={() => onClickItem((uvIndex / MAX_UV) * 100, 'UV index', UvIndex, false, 'String(uvIndex)')}
      progressValue={(uvIndex / MAX_UV) * 100}
      progressText={String(uvIndex)}
      text="UV index"
    >
      <WithSvg component={UvIndex} size={20} />
    </WeatherInfo>,
    <WeatherInfo
      onClick={() => onClickItem(cloudCover * 100, 'Cloud cover', Cloud, true)}
      progressValue={cloudCover * 100}
      text="Cloud cover"
      withPercent
    >
      <WithSvg component={Cloud} size={20} />
    </WeatherInfo>,
    <WeatherInfo
      onClick={() =>
        onClickItem((pressure / MAX_PRESSURE) * 100, 'Pressure', UvIndex, false, String(Math.round(pressure)))
      }
      progressValue={(pressure / MAX_PRESSURE) * 100}
      progressText={String(Math.round(pressure))}
      text="Pressure"
    >
      <WithSvg component={UvIndex} size={20} />
    </WeatherInfo>,
    <WeatherInfo
      onClick={() =>
        onClickItem(
          (visibility / MAX_VISIBILITY) * 100,
          'Visibility',
          Precipitation,
          false,
          `${Math.round(visibility)}km`,
        )
      }
      progressValue={(visibility / MAX_VISIBILITY) * 100}
      text="Visibility"
      progressText={`${Math.round(visibility)}km`}
    >
      <WithSvg component={Precipitation} size={20} />
    </WeatherInfo>,
    <WeatherInfo
      onClick={() =>
        onClickItem(
          (dewPoint < 0 ? -1 : 1) * (dewPoint / MAX_DEW_POINT) * 100,
          'Dew Point',
          Cloud,
          false,
          `${Number(dewPoint).toFixed(2)}°`,
        )
      }
      progressValue={(dewPoint < 0 ? -1 : 1) * (dewPoint / MAX_DEW_POINT) * 100}
      progressText={`${Number(dewPoint).toFixed(2)}°`}
      text="Dew Point"
    >
      <WithSvg component={Precipitation} size={20} />
    </WeatherInfo>,
  ]);

  return isLoading ? (
    <Spinner />
  ) : (
    <RightBottomContainer>
      <Wind maxWind={maxWind} />
      <div className={styles.otherContainer}>{items}</div>
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
