import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import CircularProgress from 'components/CircularProgress/CircularProgress';
import { makeStyles } from '@material-ui/core';
import styles from './WeatherInfo.module.css';

const useStyles = makeStyles(() => ({
  typo: {
    fontSize: '1.5rem',
  },
}));

const WeatherInfo = props => {
  const {
    children,
    progressValue,
    progressText,
    text,
    withPercent,
    onClick,
    circularSize,
    circularStrokeWidth,
    isOnFavorite,
  } = props;

  const classes = useStyles();

  const percentChar = withPercent ? '%' : '';
  const actualProgressValue = withPercent ? Math.round(progressValue) : progressValue;

  return (
    <div
      onClick={onClick}
      onKeyPress={() => {}}
      role="button"
      tabIndex="0"
      className={`${styles.weatherInfoContainer} ${isOnFavorite ? styles.weatherInfoContainerFavorite : ''}`}
    >
      <CircularProgress
        isOnFavorite={isOnFavorite}
        size={circularSize}
        strokeWidth={circularStrokeWidth}
        percent={actualProgressValue}
        activeColor="#504BCA"
        inactiveColor={isOnFavorite ? '#131231' : '#29294E'}
        text={`${!progressText ? actualProgressValue : progressText}${percentChar}`}
      />
      <div className={`${styles.textContainer} ${isOnFavorite ? styles.textContainerFavorite : ''}`}>
        <div className={styles.weatherIconContainer}>{children}</div>
        <Typography variant="subtitle1" classes={{ root: isOnFavorite ? classes.typo : '' }}>
          {text}
        </Typography>
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
  onClick: PropTypes.func,
  circularSize: PropTypes.number,
  circularStrokeWidth: PropTypes.number,
  isOnFavorite: PropTypes.bool,
};

WeatherInfo.defaultProps = {
  withPercent: false,
  progressText: undefined,
  circularSize: 70,
  circularStrokeWidth: 9,
  isOnFavorite: false,
  onClick: () => {},
};

export default WeatherInfo;
