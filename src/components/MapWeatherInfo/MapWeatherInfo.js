import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, makeStyles, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CancelIcon from '@material-ui/icons/Cancel';
import WithSvg from 'components/WithSvg/WithSvg';
import MapChart from 'components/Charts/MapChart/MapChart';
import DashedCircularProgress from 'components/DashedCircularProgress/DashedCircularProgress';
import styles from './MapWeatherInfo.module.css';

const useStyles = makeStyles(() => ({
  dividerRoot: {
    marginLeft: 20,
    marginRight: 20,
  },
  temperature: {
    fontSize: '1.9vh',
  },
}));

const MapWeatherInfo = props => {
  const { city, country, day, hourly, onClickLeftArrow, onClickRightArrow, onClickDelete } = props;

  const classes = useStyles();

  console.log('hourly', hourly);
  console.log('day', day);

  return (
    <div className={styles.container}>
      <div className={styles.countryTemp}>
        <Typography variant="h3">
          {city}, {country}
        </Typography>
        <div className={styles.temperature}>
          <WithSvg size={36} className={styles.temperatureIcon} component={`svgs/TypeOfWeather/${day.icon}.svg`} />
          <Typography classes={{ root: classes.temperature }} variant="subtitle2">
            {Math.round(day.temperatureHigh)}°C
          </Typography>
        </div>
      </div>
      <div className={styles.graphTemp}>
        <MapChart data={hourly.map(hour => hour.temperature)} />
      </div>
      <div className={styles.weatherInfo}>
        <DashedCircularProgress />
      </div>
      <div className={styles.precipitationGraph}>graph precip</div>
      <div className={styles.airGraph}>hei</div>
      <div className={styles.controlButtons}>
        <IconButton onClick={onClickLeftArrow}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={onClickRightArrow}>
          <ArrowForwardIosIcon />
        </IconButton>
        <IconButton onClick={onClickDelete}>
          <CancelIcon />
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
  hourly: PropTypes.arrayOf(PropTypes.number).isRequired,
  day: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MapWeatherInfo;
