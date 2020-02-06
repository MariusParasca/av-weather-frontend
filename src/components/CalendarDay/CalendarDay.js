import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import WithSvg from 'components/WithSvg/WithSvg';
import { ReactComponent as PartlyCloudyDaySvg } from 'svgs/weatherTypes/partly-cloudy-day.svg';
import styles from './CalendarDay.module.css';

const CalendarDay = props => {
  const { dayNumber, dayTemperature, nightTemperature } = props;
  return (
    <div className={styles.container}>
      <div className={styles.dayNumber}>
        <Typography variant="subtitle1" display="inline">
          {dayNumber}
        </Typography>
      </div>
      <div className={styles.dayTemperature}>
        <Typography variant="h5" display="inline">
          {dayTemperature}°
        </Typography>
      </div>
      <div className={styles.iconContainer}>
        <WithSvg component={PartlyCloudyDaySvg} size={44} className={styles.icon} />
      </div>
      <div className={styles.nightTemperature}>
        <Typography variant="subtitle1" display="inline">
          {nightTemperature}°
        </Typography>
      </div>
    </div>
  );
};

CalendarDay.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  dayTemperature: PropTypes.number.isRequired,
  nightTemperature: PropTypes.number.isRequired,
};

export default CalendarDay;
