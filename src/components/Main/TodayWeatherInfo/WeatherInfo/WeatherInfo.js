import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import CircularProgress from 'components/CircularProgress/CircularProgress';
import styles from './WeatherInfo.module.css';

const WeatherInfo = props => {
  const { children, progressValue, progressText, text, withPercent, textBottomGutter } = props;

  const percentChar = withPercent ? '%' : '';
  const actualProgressValue = withPercent ? Math.round(progressValue) : progressValue;

  return (
    <div className={styles.weatherInfoContainer}>
      <CircularProgress
        percent={actualProgressValue}
        text={`${!progressText ? actualProgressValue : progressText}${percentChar}`}
      />
      <div className={styles.weatherIconContainer}>{children}</div>
      <Typography variant="h5" style={{ marginBottom: textBottomGutter }}>
        {text}
      </Typography>
    </div>
  );
};

WeatherInfo.propTypes = {
  children: PropTypes.node.isRequired,
  progressValue: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  withPercent: PropTypes.bool,
  textBottomGutter: PropTypes.number,
  progressText: PropTypes.string,
};

WeatherInfo.defaultProps = {
  textBottomGutter: 0,
  withPercent: false,
  progressText: undefined,
};

export default WeatherInfo;
