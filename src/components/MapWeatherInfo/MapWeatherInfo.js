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
}));

const MapWeatherInfo = props => {
  const { city, weekDay, minTemp, maxTemp, hourly, icon, onClickLeftArrow, onClickRightArrow, onClickDelete } = props;

  const classes = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.countryTemp}>
        <Typography variant="h3">{city}</Typography>
        <div className={styles.temperature}>
          <WithSvg component={`svgs/TypeOfWeather/${icon}.svg`} />
          <Typography variant="subtitle1">12</Typography>
        </div>
      </div>
      <div className={styles.graphTemp}>
        <MapChart data={hourly} />
      </div>
      <div className={styles.weatherInfo}>
        <DashedCircularProgress />
      </div>
      <div className={styles.precipitationGraph}>
        <Typography variant="h3">{Math.round(minTemp)}°</Typography>
        <Typography variant="h3">{Math.round(maxTemp)}°</Typography>
      </div>
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
  weekDay: PropTypes.string.isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  hourly: PropTypes.arrayOf(PropTypes.number).isRequired,
  icon: PropTypes.string.isRequired,
};

export default MapWeatherInfo;
