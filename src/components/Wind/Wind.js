import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { ReactComponent as WindSvg } from 'svgs/WeatherInfo/wind.svg';
import LabeledCircularProgress from 'components/LabeledCircularProgress/LabeledCircularProgress';
import { MAX_WIND } from 'constants/constants';
import WithSvg from 'components/WithSvg/WithSvg';
import styles from './Wind.module.css';

const Wind = props => {
  const { maxWind, onClick, circularProgressSize, strokeWidth, isOnFavorite } = props;

  return (
    <div
      onKeyPress={() => {}}
      role="button"
      tabIndex="0"
      onClick={onClick}
      className={`${styles.windContainer} ${
        isOnFavorite ? styles.windContainerFavorite : styles.windIconContainerNotFavorite
      }`}
    >
      <LabeledCircularProgress
        isOnFavorite={isOnFavorite}
        circularProgressSize={circularProgressSize}
        strokeWidth={strokeWidth}
        activeColor="#504BCA"
        inactiveColor={isOnFavorite ? '#131231' : '#29294E'}
        labelFontSize={20}
        progressValue={(maxWind / MAX_WIND) * 100}
        progressText={String(Number(maxWind).toFixed(1))}
      />
      <div className={`${styles.textContainer} ${isOnFavorite ? styles.textContainerFavorite : ''}`}>
        <WithSvg component={WindSvg} size={20} className={styles.windIconContainer} />
        <Typography variant={isOnFavorite ? 'subtitle2' : 'caption'}>Max wind (m/s)</Typography>
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
