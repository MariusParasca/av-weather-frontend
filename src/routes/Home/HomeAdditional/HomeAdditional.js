import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Divider } from '@material-ui/core';
import SunInfo from 'components/SunInfo/SunInfo';

import styles from './HomeAdditional.module.css';

const useStyles = makeStyles(() => ({
  dividerRoot: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}));

const HomeAdditional = props => {
  const { sunriseTime, sunsetTime } = props;
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} />
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
    </div>
  );
};

HomeAdditional.propTypes = {
  sunriseTime: PropTypes.number.isRequired,
  sunsetTime: PropTypes.number.isRequired,
};

export default HomeAdditional;
