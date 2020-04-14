import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Typography, Grid } from '@material-ui/core';
import PinDropIcon from '@material-ui/icons/PinDrop';
import MapIcon from '@material-ui/icons/Map';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { PageRoute, ChartsRoute } from 'utils/routes';
import { CHART_OPTIONS, CHART_SUB_PAGE_TITLES } from 'constants/constants';
import MenuButton from 'components/MenuButton/MenuButton';
import styles from './Charts.module.css';
import Temperature from './Temperature/Temperature';
import Precipitation from './Precipitation/Precipitation';
import Humidity from './Humidity/Humidity';
import Wind from './Wind/Wind';
import Pressure from './Pressure/Pressure';

const Charts = props => {
  const { hourly, daily } = props;
  const [currentOption, setCurrentOption] = useState(1);

  const changeOption = event => {
    setCurrentOption(event.target.value);
  };

  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.selectContainer}>
          <TextField select fullWidth onChange={changeOption} value={currentOption}>
            {CHART_OPTIONS.map((option, index) => (
              <MenuItem key={option} value={index}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className={styles.chartContainer}>
              <Temperature hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.chartContainer}>
              <Precipitation hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.chartContainer}>
              <Humidity hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
        </Grid>

        <Route path={`${PageRoute.charts}${ChartsRoute.wind}`}>
          <Wind hourly={hourly} daily={daily} option={currentOption} />
        </Route>
        <Route path={`${PageRoute.charts}${ChartsRoute.pressure}`}>
          <Pressure hourly={hourly} daily={daily} option={currentOption} />
        </Route>
      </div>
    </Router>
  );
};

Charts.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Charts;
