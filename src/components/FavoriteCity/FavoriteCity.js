import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Button } from '@material-ui/core';

import { getTimeFromDate } from 'utils/dateTimeUtils';
import StarIcon from '@material-ui/icons/Star';
import styles from './FavoriteCity.module.css';

const useStyles = makeStyles(() => ({
  starButtonRoot: {
    padding: 0,
    minWidth: 0,
  },
}));

const getTimeBasedOnTimeZone = offset => {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const newDate = new Date(utc + 60000 * offset);

  return newDate;
};

const FavoriteCity = props => {
  const { city, country, degreeValue, utcOffset } = props;

  const classes = useStyles();

  const [time, setTime] = useState('00:00');

  const startClock = useCallback(() => {
    if (city && country) {
      let date;
      if (utcOffset) date = getTimeBasedOnTimeZone(utcOffset);

      if (date) {
        setTime(getTimeFromDate(date));
      }
    }
  }, [city, country, utcOffset]);

  useEffect(() => {
    startClock();
    setInterval(startClock, 60 * 1000);
  }, [startClock]);

  return (
    <div className={styles.container}>
      <div className={styles.localTimeContainer}>
        <Typography variant="h6">{utcOffset && `Local time: ${time}`}</Typography>
        <Button classes={{ root: classes.starButtonRoot }}>
          <StarIcon />
        </Button>
      </div>
      <Typography variant="h4">{`${city}, ${country}`}</Typography>
      <div className={styles.valueContainer}>
        <div className={styles.degreeValue}>
          <Typography variant="h1">{degreeValue}°C</Typography>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} alt="weather type" src="https://via.placeholder.com/200x150.jpg" />
        </div>
      </div>
    </div>
  );
};

FavoriteCity.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  degreeValue: PropTypes.number.isRequired,
  utcOffset: PropTypes.number,
};

FavoriteCity.defaultProps = {
  utcOffset: undefined,
};

export default FavoriteCity;