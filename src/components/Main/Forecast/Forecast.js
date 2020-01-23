import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '200px',
  },
}));

const Forecast = props => {
  const classes = useStyles();

  const { daysTemperature } = props;

  return (
    <div className={classes.height}>
      {daysTemperature.map(el => (
        <p>{JSON.stringify(el)}</p>
      ))}
    </div>
  );
};

Forecast.propTypes = {
  daysTemperature: PropTypes.arrayOf.isRequired,
};

export default Forecast;
