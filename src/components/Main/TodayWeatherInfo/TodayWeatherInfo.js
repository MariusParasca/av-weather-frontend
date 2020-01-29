import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Divider } from '@material-ui/core';

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { ReactComponent as Humidity } from 'svgs/humidity.svg';
import { ReactComponent as Precipitation } from 'svgs/precipitation.svg';
import { ReactComponent as UvIndex } from 'svgs/uvIndex.svg';
import { ReactComponent as Cloud } from 'svgs/cloud.svg';

import { createDateFromEpoch, getTimeFromDate } from 'utils/dateTimeUtils';
import WithSvg from 'components/WithSvg/WithSvg';
import LabeledCircularProgress from 'components/LabeledCircularProgress/LabeledCircularProgress';
import { RIGHT_DRAWER_WIDTH, MAX_UV, MAX_PRESSURE, MAX_VISIBILITY, MAX_DEW_POINT, MAX_WIND } from 'constants/constants';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import styles from './TodayWeatherInfo.module.css';

const useStyles = makeStyles(() => ({
  paper: {
    width: RIGHT_DRAWER_WIDTH - 20,
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
  },
  iconRoot: {
    fontSize: '1em',
    marginRight: '5px',
  },
  circularProgressRoot: {
    width: '65px',
    height: '65px',
  },
  dividerRoot: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}));

const TodayWeatherInfo = props => {
  const { weatherInfo } = props;

  const {
    maxWind,
    humidity,
    precipitation,
    uvIndex,
    cloudCover,
    pressure,
    visibility,
    dewPoint,
    sunriseTime,
    sunsetTime,
  } = weatherInfo;

  const classes = useStyles();

  const screenSunriseTime = getTimeFromDate(createDateFromEpoch(sunriseTime));
  const screenSunsetTime = getTimeFromDate(createDateFromEpoch(sunsetTime));

  return (
    <div className={classes.paper}>
      <div className={styles.drawerContainer}>
        <div className={styles.sunInfoContainer}>
          <div className={styles.sunInfoMiniContainer}>
            <WbSunnyIcon classes={{ root: classes.iconRoot }} />
            <span className={styles.sunText}>Sun</span>
          </div>
          <div className={styles.sunInfoMiniContainer}>
            <ArrowUpwardIcon />
            <span className={styles.sunText}>{screenSunriseTime}</span>
          </div>
          <div className={styles.sunInfoMiniContainer}>
            <ArrowDownwardIcon />
            <span className={styles.sunText}>{screenSunsetTime}</span>
          </div>
        </div>
        <div>
          <img src="https://via.placeholder.com/340x200.jpg" />
        </div>
        <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
      </div>
      <div className={styles.weatherInfoContainer}>
        <div className={styles.windContainer}>
          <LabeledCircularProgress
            labelFontSize={16}
            progressValue={(maxWind / MAX_WIND) * 100}
            progressText={String(Number(maxWind).toFixed(1))}
          />
          <WithSvg component={Humidity} size={20} className={styles.windIconContainer} />
          <Typography variant="h5">Max wind (m/s)</Typography>
        </div>
        <WeatherInfo progressValue={53} text="Wind | TO DO" withPercent>
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
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
          progressValue={-1 * (dewPoint / MAX_DEW_POINT) * 100}
          progressText={`${Number(dewPoint).toFixed(2)}°`}
          text="Dew Point"
        >
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
      </div>
    </div>
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
    sunriseTime: PropTypes.number,
    sunsetTime: PropTypes.number,
  }).isRequired,
};

export default TodayWeatherInfo;
