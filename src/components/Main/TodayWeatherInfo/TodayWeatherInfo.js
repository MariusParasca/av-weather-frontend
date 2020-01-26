import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { ReactComponent as Humidity } from 'svgs/humidity.svg';
import { ReactComponent as Precipitation } from 'svgs/precipitation.svg';
import { ReactComponent as UvIndex } from 'svgs/uvIndex.svg';
import { ReactComponent as Cloud } from 'svgs/cloud.svg';

import { createDateFromEpoch, getTimeFromDate } from 'utils/dateTimeUtils';
import WithSvg from 'components/WithSvg/WithSvg';
import { RIGHT_DRAWER_WIDTH, MAX_UV, MAX_PRESSURE, MAX_VISIBILITY, MAX_DEW_POINT } from 'constants/constants';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import styles from './TodayWeatherInfo.module.css';

const useStyles = makeStyles(() => ({
  paper: {
    width: RIGHT_DRAWER_WIDTH - 30,
    paddingLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  iconRoot: {
    fontSize: '1em',
    marginRight: '5px',
  },
  circularProgressRoot: {
    width: '65px',
    height: '65px',
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

  console.log(dewPoint);

  return (
    <Drawer anchor="right" classes={{ paper: classes.paper }} variant="permanent">
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
          <img src="https://via.placeholder.com/350x200.jpg" />
        </div>
        <Divider variant="middle" />
        <WeatherInfo progressValue={53} text="Wind | TO DO" withPercent textBottomGutter={5}>
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
        <WeatherInfo progressValue={humidity * 100} text="Humidity" withPercent textBottomGutter={5}>
          <WithSvg component={Humidity} size={20} />
        </WeatherInfo>
        <WeatherInfo progressValue={precipitation * 100} text="Precipitation" withPercent textBottomGutter={5}>
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
        <WeatherInfo
          progressValue={(uvIndex / MAX_UV) * 100}
          progressText={String(uvIndex)}
          text="UV index"
          textBottomGutter={5}
        >
          <WithSvg component={UvIndex} size={20} />
        </WeatherInfo>
        <WeatherInfo progressValue={cloudCover * 100} text="Cloud cover" withPercent textBottomGutter={5}>
          <WithSvg component={Cloud} size={20} />
        </WeatherInfo>
        <WeatherInfo
          progressValue={(pressure / MAX_PRESSURE) * 100}
          progressText={String(pressure)}
          text="Pressure"
          textBottomGutter={5}
        >
          <WithSvg component={UvIndex} size={20} />
        </WeatherInfo>
        <WeatherInfo
          progressValue={(visibility / MAX_VISIBILITY) * 100}
          text="Visibility"
          progressText={`${Math.round(visibility)}km`}
          textBottomGutter={5}
        >
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
        <WeatherInfo
          progressValue={-1 * (dewPoint / MAX_DEW_POINT) * 100}
          progressText={`${dewPoint}°`}
          text="Dew Point"
          textBottomGutter={5}
        >
          <WithSvg component={Precipitation} size={20} />
        </WeatherInfo>
      </div>
    </Drawer>
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
