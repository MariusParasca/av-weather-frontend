import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Typography } from '@material-ui/core';
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
  const [currentOption, setCurrentOption] = useState(0);

  const changeOption = event => {
    setCurrentOption(event.target.value);
  };

  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.selectContainer}>
            <TextField select fullWidth onChange={changeOption} value={currentOption}>
              {CHART_OPTIONS.map((option, index) => (
                <MenuItem key={option} value={index}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={styles.chartContainer}>
            <Switch>
              <Route path={`${PageRoute.charts}${ChartsRoute.temperature}`}>
                <Temperature hourly={hourly} daily={daily} option={currentOption} />
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.precipitation}`}>
                <Precipitation />
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.humidity}`}>
                <Humidity />
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.wind}`}>
                <Wind />
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.pressure}`}>
                <Pressure />
              </Route>
            </Switch>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.subMenu}>
            <MenuButton path={`${PageRoute.charts}${ChartsRoute.temperature}`}>
              <PinDropIcon />
            </MenuButton>
            <MenuButton path={`${PageRoute.charts}${ChartsRoute.precipitation}`}>
              <MapIcon />
            </MenuButton>
            <MenuButton path={`${PageRoute.charts}${ChartsRoute.humidity}`}>
              <PinDropIcon />
            </MenuButton>
            <MenuButton path={`${PageRoute.charts}${ChartsRoute.wind}`}>
              <MapIcon />
            </MenuButton>
            <MenuButton path={`${PageRoute.charts}${ChartsRoute.pressure}`}>
              <PinDropIcon />
            </MenuButton>
          </div>
          <div className={styles.titleContainer}>
            <Switch>
              <Route path={`${PageRoute.charts}${ChartsRoute.temperature}`}>
                <Typography variant="h5">{CHART_SUB_PAGE_TITLES[0]}</Typography>
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.precipitation}`}>
                <Typography variant="h5">{CHART_SUB_PAGE_TITLES[1]}</Typography>
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.humidity}`}>
                <Typography variant="h5">{CHART_SUB_PAGE_TITLES[2]}</Typography>
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.wind}`}>
                <Typography variant="h5">{CHART_SUB_PAGE_TITLES[3]}</Typography>
              </Route>
              <Route path={`${PageRoute.charts}${ChartsRoute.pressure}`}>
                <Typography variant="h5">{CHART_SUB_PAGE_TITLES[4]}</Typography>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

Charts.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Charts;
