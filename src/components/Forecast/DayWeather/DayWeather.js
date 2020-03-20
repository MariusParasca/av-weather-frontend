import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import WithSvg from 'components/WithSvg/WithSvg';
import { ReactComponent as PartlyCloudyDaySvg } from 'svgs/weatherTypes/partly-cloudy-day.svg';
import styles from './DayWeather.module.css';

const useStyles = makeStyles(() => ({
  nightStyle: {
    color: '#34317C',
  },
  labelTypo: {
    fontWeight: '600',
  },
}));

const DayWeather = props => {
  const { highlight, label, temperatureDay, temperatureNight, svg } = props;

  const classes = useStyles();

  return (
    <div className={`${styles.mainContainer} ${highlight ? styles.highlight : ''}`} key={label}>
      <Typography variant="subtitle2" align="center" classes={{ root: classes.labelTypo }}>
        {label}
      </Typography>
      <div className={styles.iconContainer}>
        <WithSvg component={svg} size={40} />
      </div>
      <div className={styles.dayContainer}>
        <Typography variant="h3" display="inline">
          {Math.round(temperatureDay)}°
        </Typography>
        <Typography variant="subtitle2" display="inline" classes={{ root: classes.nightStyle }}>
          / {Math.round(temperatureNight)}°
        </Typography>
      </div>
    </div>
  );
};

DayWeather.propTypes = {
  label: PropTypes.string.isRequired,
  temperatureNight: PropTypes.number.isRequired,
  temperatureDay: PropTypes.number.isRequired,
  highlight: PropTypes.bool,
  svg: PropTypes.string.isRequired,
};

DayWeather.defaultProps = {
  highlight: false,
};

export default DayWeather;
