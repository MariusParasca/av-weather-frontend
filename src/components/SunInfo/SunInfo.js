import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { createDateFromEpoch, getTimeFromDate } from 'utils/dateTimeUtils';
import styles from './SunInfo.module.css';

const useStyles = makeStyles(() => ({
  iconRoot: {
    fontSize: '1em',
    marginRight: '5px',
  },
}));

const SunInfo = props => {
  const classes = useStyles();

  const { sunriseTime, sunsetTime } = props;

  const screenSunriseTime = getTimeFromDate(createDateFromEpoch(sunriseTime));
  const screenSunsetTime = getTimeFromDate(createDateFromEpoch(sunsetTime));
  return (
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
        <img alt="weather type" src="https://via.placeholder.com/340x200.jpg" />
      </div>
    </div>
  );
};

SunInfo.propTypes = {
  sunriseTime: PropTypes.number.isRequired,
  sunsetTime: PropTypes.number.isRequired,
};

export default SunInfo;
