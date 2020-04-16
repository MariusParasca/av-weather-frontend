import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Switch, Typography, Grid, makeStyles } from '@material-ui/core';

import styles from './Settings.module.css';

const useStyles = makeStyles(theme => ({
  switchBase: {
    color: theme.palette.primary.main,
  },
  track: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Settings = props => {
  const [isCelsius, setIsCelsius] = useState(true);

  const classes = useStyles();

  const changeIsCelsius = useCallback(() => {
    setIsCelsius(!isCelsius);
  }, [isCelsius]);

  return (
    <div className={styles.container}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Farhenheit</Grid>
          <Grid item>
            <Switch
              classes={{ switchBase: classes.switchBase, track: classes.track }}
              color="primary"
              checked={isCelsius}
              onChange={changeIsCelsius}
            />
          </Grid>
          <Grid item>Celsius</Grid>
        </Grid>
      </Typography>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
