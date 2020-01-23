import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import CircularProgress from 'components/CircularProgress/CircularProgress';
import styles from './WeatherInfo.module.css';

const WeatherInfo = props => {
  const { children, progressValue, progressText, text, withPercent, textBottomGutter } = props;

  let leftPosition = withPercent ? 18 : 21;
  const topPosition = withPercent ? 20 : 21;

  if (progressValue < 10) {
    leftPosition += 6;
  }

  return (
    <div className={styles.weatherInfoContainer}>
      <div className={styles.circularProgressContainer}>
        <CircularProgress percent={progressValue} />
        <span
          style={{
            position: 'absolute',
            left: leftPosition,
            top: topPosition,
          }}
        >
          {!progressText ? progressValue : progressText}
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
  progressText: PropTypes.string,
};

WeatherInfo.defaultProps = {
  textBottomGutter: 0,
  progressText: undefined,
};

export default WeatherInfo;
