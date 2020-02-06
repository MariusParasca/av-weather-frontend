import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { ReactComponent as Humidity } from 'svgs/humidity.svg';
import { ReactComponent as Precipitation } from 'svgs/precipitation.svg';
import { ReactComponent as UvIndex } from 'svgs/uvIndex.svg';
import { ReactComponent as Cloud } from 'svgs/cloud.svg';

import WithSvg from 'components/WithSvg/WithSvg';
import LabeledCircularProgress from 'components/LabeledCircularProgress/LabeledCircularProgress';
import { MAX_UV, MAX_PRESSURE, MAX_VISIBILITY, MAX_DEW_POINT, MAX_WIND } from 'constants/constants';
import Spinner from 'components/Spinner/Spinner';
import RightBottomContainer from 'components/RightBottomContainer/RightBottomContainer';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import styles from './TodayWeatherInfo.module.css';

const TodayWeatherInfo = props => {
  const { weatherInfo, isLoading } = props;

  const { maxWind, humidity, precipitation, uvIndex, cloudCover, pressure, visibility, dewPoint } = weatherInfo;

  return isLoading ? (
    <Spinner />
  ) : (
    <RightBottomContainer>
      <div className={styles.windContainer}>
        <LabeledCircularProgress
          labelFontSize={16}
          progressValue={(maxWind / MAX_WIND) * 100}
          progressText={String(Number(maxWind).toFixed(1))}
        />
        <WithSvg component={Humidity} size={20} className={styles.windIconContainer} />
        <Typography variant="subtitle1">Max wind (m/s)</Typography>
      </div>
      <div className={styles.otherContainer}>
        <WeatherInfo progressValue={humidity * 100} text="Humidity" withPercent>
          <WithSvg component={Humidity} size={20} />
        </WeatherInfo>
        <WeatherInfo progressValue={precipitation * 100} text="Precipitation" withPercent>
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
        <WeatherInfo progressValue={(uvIndex / MAX_UV) * 100} progressText={String(uvIndex)} text="UV index">
          <WithSvg component={UvIndex} size={20} />
        </WeatherInfo>
        <WeatherInfo progressValue={cloudCover * 100} text="Cloud cover" withPercent>
          <WithSvg component={Cloud} size={20} />
        </WeatherInfo>
        <WeatherInfo
          progressValue={(pressure / MAX_PRESSURE) * 100}
          progressText={String(Math.round(pressure))}
          text="Pressure"
        >
          <WithSvg component={UvIndex} size={20} />
        </WeatherInfo>
        <WeatherInfo
          progressValue={(visibility / MAX_VISIBILITY) * 100}
          text="Visibility"
          progressText={`${Math.round(visibility)}km`}
        >
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
        <WeatherInfo
          progressValue={(dewPoint < 0 ? -1 : 1) * (dewPoint / MAX_DEW_POINT) * 100}
          progressText={`${Number(dewPoint).toFixed(2)}°`}
          text="Dew Point"
        >
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
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
