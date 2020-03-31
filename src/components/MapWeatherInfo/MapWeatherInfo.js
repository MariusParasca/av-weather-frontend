import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, makeStyles, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CancelIcon from '@material-ui/icons/Cancel';
import WithSvg from 'components/WithSvg/WithSvg';
import MapChart from 'components/Charts/MapChart/MapChart';
import styles from './MapWeatherInfo.module.css';

const useStyles = makeStyles(() => ({
  dividerRoot: {
    marginLeft: 20,
    marginRight: 20,
  },
}));

const MapWeatherInfo = props => {
  const {
    city,
    weekDay,
    summaryDay,
    minTemp,
    maxTemp,
    hourly,
    icon,
    onClickLeftArrow,
    onClickRightArrow,
    onClickDelete,
  } = props;

  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Typography variant="h3">{city}</Typography>
      <Divider orientation="vertical" classes={{ root: classes.dividerRoot }} />
      <Typography variant="h4">{weekDay}</Typography>
      <WithSvg component={`svgs/TypeOfWeather/Forecast/${icon}.svg`} />
      <Typography variant="h5">{summaryDay}</Typography>
      <Divider orientation="vertical" classes={{ root: classes.dividerRoot }} />
      <Typography variant="h3">{Math.round(minTemp)}°</Typography>
      <div>
        <MapChart data={hourly} />
      </div>
      <Typography variant="h3">{Math.round(maxTemp)}°</Typography>
      <Divider orientation="vertical" classes={{ root: classes.dividerRoot }} />
      <div>
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
  summaryDay: PropTypes.string.isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  hourly: PropTypes.arrayOf(PropTypes.number).isRequired,
  icon: PropTypes.string.isRequired,
};

export default MapWeatherInfo;
