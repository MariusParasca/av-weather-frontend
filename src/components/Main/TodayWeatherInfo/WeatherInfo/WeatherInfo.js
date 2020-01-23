import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import styles from './WeatherInfo.module.css';

const WeatherInfo = props => {
  const { children, progressValue, text, withPercent, textBottomGutter } = props;

  const leftPosition = withPercent ? '18px' : '21px';
  const topPosition = withPercent ? '20px' : '21px';

  return (
    <div className={styles.weatherInfoContainer}>
      <div className={styles.circularProgressContainer}>
        <div className={styles.mirroring}>
          <CircularProgress size={65} variant="static" value={progressValue} />
        </div>
        <span
          style={{
            position: 'absolute',
            left: leftPosition,
            top: topPosition,
          }}
        >
          {progressValue}
          {withPercent ? '%' : null}
        </span>
      </div>
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
  withPercent: PropTypes.bool.isRequired,
  textBottomGutter: PropTypes.number,
};

WeatherInfo.defaultProps = {
  textBottomGutter: 0,
};

export default WeatherInfo;
