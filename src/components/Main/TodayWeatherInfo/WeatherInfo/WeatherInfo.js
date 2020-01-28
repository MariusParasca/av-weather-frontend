import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import CircularProgress from 'components/CircularProgress/CircularProgress';
import styles from './WeatherInfo.module.css';

const WeatherInfo = props => {
  const { children, progressValue, progressText, text, withPercent } = props;

  const percentChar = withPercent ? '%' : '';
  const actualProgressValue = withPercent ? Math.round(progressValue) : progressValue;

  return (
    <div className={styles.weatherInfoContainer}>
      <CircularProgress
        percent={actualProgressValue}
        text={`${!progressText ? actualProgressValue : progressText}${percentChar}`}
      />
      <div className={styles.textContainer}>
        <div className={styles.weatherIconContainer}>{children}</div>
        <Typography variant="h5">{text}</Typography>
      </div>
    </div>
  );
};

WeatherInfo.propTypes = {
  children: PropTypes.node.isRequired,
  progressValue: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  withPercent: PropTypes.bool,
  progressText: PropTypes.string,
};

WeatherInfo.defaultProps = {
  withPercent: false,
  progressText: undefined,
};

export default WeatherInfo;
