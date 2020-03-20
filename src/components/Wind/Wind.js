import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import { ReactComponent as WindSvg } from 'svgs/WeatherInfo/wind.svg';
import LabeledCircularProgress from 'components/LabeledCircularProgress/LabeledCircularProgress';
import { MAX_WIND } from 'constants/constants';
import WithSvg from 'components/WithSvg/WithSvg';
import styles from './Wind.module.css';

const useStyles = makeStyles(() => ({
  typo: {
    fontSize: '1.5rem',
  },
}));

const Wind = props => {
  const { maxWind, onClick, circularProgressSize, strokeWidth, isOnFavorite } = props;

  const classes = useStyles();

  return (
    <div
      onKeyPress={() => {}}
      role="button"
      tabIndex="0"
      onClick={onClick}
      className={`${styles.windContainer} ${isOnFavorite ? styles.windContainerFavorite : ''}`}
    >
      <LabeledCircularProgress
        isOnFavorite={isOnFavorite}
        circularProgressSize={circularProgressSize}
        strokeWidth={strokeWidth}
        labelFontSize={16}
        progressValue={(maxWind / MAX_WIND) * 100}
        progressText={String(Number(maxWind).toFixed(1))}
      />
      <div className={`${styles.textContainer} ${isOnFavorite ? styles.textContainerFavorite : ''}`}>
        <WithSvg component={WindSvg} size={20} className={styles.windIconContainer} />
        <Typography variant="caption" classes={{ root: isOnFavorite ? classes.typo : '' }}>
          Max wind (m/s)
        </Typography>
      </div>
    </div>
  );
};

Wind.propTypes = {
  maxWind: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  circularProgressSize: PropTypes.number,
  strokeWidth: PropTypes.number,
  isOnFavorite: PropTypes.bool,
};

Wind.defaultProps = {
  onClick: () => {},
  circularProgressSize: undefined,
  strokeWidth: undefined,
  isOnFavorite: false,
};

export default Wind;
