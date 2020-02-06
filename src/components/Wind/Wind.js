import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { ReactComponent as Humidity } from 'svgs/humidity.svg';
import LabeledCircularProgress from 'components/LabeledCircularProgress/LabeledCircularProgress';
import { MAX_WIND } from 'constants/constants';
import WithSvg from 'components/WithSvg/WithSvg';
import styles from './Wind.module.css';

const Wind = props => {
  const { maxWind } = props;

  return (
    <div className={styles.windContainer}>
      <LabeledCircularProgress
        labelFontSize={16}
        progressValue={(maxWind / MAX_WIND) * 100}
        progressText={String(Number(maxWind).toFixed(1))}
      />
      <WithSvg component={Humidity} size={20} className={styles.windIconContainer} />
      <Typography variant="subtitle1">Max wind (m/s)</Typography>
    </div>
  );
};

Wind.propTypes = {
  maxWind: PropTypes.number.isRequired,
};

export default Wind;
