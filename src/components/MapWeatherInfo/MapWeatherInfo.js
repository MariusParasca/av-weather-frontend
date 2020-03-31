import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, makeStyles, Icon, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CancelIcon from '@material-ui/icons/Cancel';
import WithSvg from 'components/WithSvg/WithSvg';
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
      <div>graph</div>
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
};

export default MapWeatherInfo;
