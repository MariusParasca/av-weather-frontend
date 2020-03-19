import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { createDateFromEpoch, getTimeFromDate } from 'utils/dateTimeUtils';
import { ReactComponent as RiseSvg } from 'svgs/SunInfo/rise.svg';
import { ReactComponent as SetSvg } from 'svgs/SunInfo/set.svg';
import { ReactComponent as SunrisesetSvg } from 'svgs/SunInfo/sunriseset.svg';
import WithSvg from 'components/WithSvg/WithSvg';
import styles from './SunInfo.module.css';

const useStyles = makeStyles(() => ({
  iconRoot: {
    fontSize: '1em',
    marginRight: '5px',
  },
}));

const SunInfo = props => {
  const classes = useStyles();

  const { sunriseTime, sunsetTime } = props;

  const screenSunriseTime = getTimeFromDate(createDateFromEpoch(sunriseTime));
  const screenSunsetTime = getTimeFromDate(createDateFromEpoch(sunsetTime));
  return (
    <div className={styles.sunInfoContainer}>
      <div className={styles.sunInfoMiniContainer}>
        <WithSvg component={SunrisesetSvg} size={18} />
        <span className={styles.sunText}>Sun</span>
      </div>
      <div className={styles.sunInfoMiniContainer}>
        <WithSvg component={RiseSvg} width={12} height={16} />
        <span className={styles.sunText}>{screenSunriseTime}</span>
      </div>
      <div className={styles.sunInfoMiniContainer}>
        <WithSvg component={SetSvg} width={12} height={16} />
        <span className={styles.sunText}>{screenSunsetTime}</span>
      </div>
    </div>
  );
};

SunInfo.propTypes = {
  sunriseTime: PropTypes.number.isRequired,
  sunsetTime: PropTypes.number.isRequired,
};

export default SunInfo;
