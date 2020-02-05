import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Typography, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import styles from './FavoriteCity.module.css';

const useStyles = makeStyles(theme => ({
  starButtonRoot: {
    padding: 0,
    minWidth: 0,
  },
}));

const FavoriteCity = props => {
  const { time, location, degreeValue } = props;

  const classes = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.localTimeContainer}>
        <Typography variant="h6">Local time: {time}</Typography>
        <Button classes={{ root: classes.starButtonRoot }}>
          <StarIcon />
        </Button>
      </div>
      <Typography variant="h4">{location}</Typography>
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
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  degreeValue: PropTypes.number.isRequired,
};

export default FavoriteCity;
