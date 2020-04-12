import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import styles from './ForecastDay.module.css';

const useStyles = makeStyles(() => ({
  typo: {
    fontSize: '12px',
  },
}));

const ForecastDay = props => {
  const { dayName, temperature, icon } = props;
  const classes = useStyles();

  const [image, setImage] = useState('');

  useEffect(() => {
    const getImage = async image => {
      const imageImported = await import(`../../../images/TypeOfWeather/${image}.png`);
      setImage(imageImported);
    };
    if (icon) {
      getImage(icon);
    }
  }, [icon]);

  return (
    <div className={styles.container}>
      <Typography variant="subtitle2" classes={{ root: classes.typo }}>
        {dayName}
      </Typography>
      <div className={styles.imageContainer}>
        <img className={styles.imageResponsive} alt="weather icon" src={image.default} />
      </div>
      <Typography variant="subtitle2" classes={{ root: classes.typo }}>
        {Math.round(temperature)}°
      </Typography>
    </div>
  );
};

ForecastDay.propTypes = {
  dayName: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ForecastDay;
