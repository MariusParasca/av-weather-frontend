import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles, IconButton, withWidth } from '@material-ui/core';

import { ReactComponent as NextSvg } from 'svgs/next.svg';
import { ReactComponent as BackSvg } from 'svgs/back.svg';
import { ReactComponent as CrossSvg } from 'svgs/cross.svg';
import { ReactComponent as WindSvg } from 'svgs/WeatherInfo/wind.svg';
import { ReactComponent as uvIndexSvg } from 'svgs/WeatherInfo/uv_index.svg';
import { ReactComponent as cloudCoverSvg } from 'svgs/WeatherInfo/cloud_cover.svg';
import { ReactComponent as eyeSvg } from 'svgs/WeatherInfo/eye.svg';
import { ReactComponent as pressureSvg } from 'svgs/WeatherInfo/pressure.svg';

import { MAX_UV, MAX_PRESSURE, MAX_VISIBILITY } from 'constants/constants';
// import { ReactComponent as CrossSvg } from 'svgs/cross.svg';
import WithSvg from 'components/WithSvg/WithSvg';
import MapChart from 'components/Charts/MapChart/MapChart';
import AirGauge from 'components/AirGauge/AirGauge';
import CircularProgress from 'components/CircularProgress/CircularProgress';
import { flatten } from 'utils/helperFunctions';
import styles from './MapWeatherInfo.module.css';

const useStyles = makeStyles(() => ({
  iconButtonRoot: {
    padding: '6px',
  },
  temperature: {
    fontSize: '1.9vh',
  },
}));

const MapWeatherInfo = props => {
  const { width, city, country, day, dailyHourly, onClickLeftArrow, onClickRightArrow, onClickDelete } = props;

  const classes = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.countryTemp}>
        <Typography variant="h3">
          {city}, {country}
        </Typography>
      </div>
      <div className={styles.graphTemp}>
        <div className={styles.temperature}>
          <WithSvg size={70} className={styles.temperatureIcon} component={`svgs/TypeOfWeather/${day.icon}.svg`} />
          <Typography variant="h3">{Math.round(day.temperatureHigh)}°C</Typography>
        </div>
      </div>
      <div className={styles.weatherInfo}>
        <div className={styles.subWeatherInfo}>
          <CircularProgress
            size={width === 'md' ? 55 : 65}
            strokeWidth={width === 'md' ? 5 : 9}
            percent={day.windSpeed}
          >
            <WithSvg size={width === 'md' ? 12 : 16} component={WindSvg} />
          </CircularProgress>
          <CircularProgress
            size={width === 'md' ? 55 : 65}
            strokeWidth={width === 'md' ? 5 : 9}
            percent={(day.uvIndex / MAX_UV) * 100}
          >
            <WithSvg size={width === 'md' ? 12 : 16} component={uvIndexSvg} />
          </CircularProgress>
          <CircularProgress
            size={width === 'md' ? 55 : 65}
            strokeWidth={width === 'md' ? 5 : 9}
            percent={day.cloudCover * 100}
          >
            <WithSvg size={width === 'md' ? 12 : 16} component={cloudCoverSvg} />
          </CircularProgress>
          <CircularProgress
            size={width === 'md' ? 55 : 65}
            strokeWidth={width === 'md' ? 5 : 9}
            percent={(day.visibility / MAX_VISIBILITY) * 100}
          >
            <WithSvg size={width === 'md' ? 12 : 16} component={eyeSvg} />
          </CircularProgress>
          <CircularProgress
            size={width === 'md' ? 55 : 65}
            strokeWidth={width === 'md' ? 5 : 9}
            percent={(day.pressure / MAX_PRESSURE) * 100}
          >
            <WithSvg size={width === 'md' ? 12 : 16} component={pressureSvg} />
          </CircularProgress>
        </div>
      </div>
      <div className={styles.graph}>
        <MapChart data={flatten(dailyHourly).map(hour => hour.temperature)} />
      </div>
      <div className={styles.airGraph}>
        <AirGauge airQuality={27} />
      </div>
      <div className={styles.controlButtons}>
        <IconButton onClick={onClickLeftArrow} classes={{ root: classes.iconButtonRoot }}>
          <WithSvg component={BackSvg} size={15} />
        </IconButton>
        <IconButton onClick={onClickRightArrow} classes={{ root: classes.iconButtonRoot }}>
          <WithSvg component={NextSvg} size={15} />
        </IconButton>
        <IconButton onClick={onClickDelete} classes={{ root: classes.iconButtonRoot }}>
          <WithSvg component={CrossSvg} size={15} />
        </IconButton>
      </div>
    </div>
  );
};

MapWeatherInfo.propTypes = {
  onClickLeftArrow: PropTypes.func.isRequired,
  onClickRightArrow: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  day: PropTypes.objectOf(PropTypes.any).isRequired,
  dailyHourly: PropTypes.arrayOf(PropTypes.any).isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(MapWeatherInfo);
