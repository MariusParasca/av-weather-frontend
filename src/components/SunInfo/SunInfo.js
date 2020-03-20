import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Typography } from '@material-ui/core';

import { createDateFromEpoch, getTimeFromDate } from 'utils/dateTimeUtils';
import { ReactComponent as RiseSvg } from 'svgs/SunInfo/rise.svg';
import { ReactComponent as SetSvg } from 'svgs/SunInfo/set.svg';
import { ReactComponent as SunrisesetSvg } from 'svgs/SunInfo/sunriseset.svg';
import WithSvg from 'components/WithSvg/WithSvg';
import styles from './SunInfo.module.css';

const useStyles = makeStyles(() => ({
  typo: {
    marginLeft: '4px',
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
        <Typography classes={{ root: classes.typo }} variant="subtitle2" className={styles.sunText}>
          Sun
        </Typography>
      </div>
      <div className={styles.sunInfoMiniContainer}>
        <WithSvg component={RiseSvg} width={12} height={16} />
        <Typography classes={{ root: classes.typo }} variant="subtitle2" className={styles.sunText}>
          {screenSunriseTime}
        </Typography>
      </div>
      <div className={styles.sunInfoMiniContainer}>
        <WithSvg component={SetSvg} width={12} height={16} />
        <Typography classes={{ root: classes.typo }} variant="subtitle2" className={styles.sunText}>
          {screenSunsetTime}
        </Typography>
      </div>
    </div>
  );
};

SunInfo.propTypes = {
  sunriseTime: PropTypes.number.isRequired,
  sunsetTime: PropTypes.number.isRequired,
};

export default SunInfo;
