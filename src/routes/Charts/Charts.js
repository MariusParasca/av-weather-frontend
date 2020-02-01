import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Typography } from '@material-ui/core';
import PinDropIcon from '@material-ui/icons/PinDrop';
import MapIcon from '@material-ui/icons/Map';

import { CHART_OPTIONS, CHART_SUB_PAGE_TITLES } from 'constants/constants';
import HourlyChart from 'components/Charts/HourlyChart/HourlyChart';
import MenuButton from 'components/MenuButton/MenuButton';
import styles from './Charts.module.css';

const Charts = props => {
  const { hourly } = props;
  const [currentOption, setCurrentOption] = useState(0);

  const changeOption = event => {
    setCurrentOption(event.target.value);
  };

  let chart;
  if (CHART_OPTIONS[currentOption] === CHART_OPTIONS[0]) {
    chart = <HourlyChart hourlyData={hourly} />;
  }

  return (
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
        <div className={styles.chartContainer}>{chart}</div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.subMenu}>
          <MenuButton>
            <PinDropIcon />
          </MenuButton>
          <MenuButton>
            <MapIcon />
          </MenuButton>
          <MenuButton>
            <PinDropIcon />
          </MenuButton>
          <MenuButton>
            <MapIcon />
          </MenuButton>
          <MenuButton>
            <PinDropIcon />
          </MenuButton>
        </div>
        <div className={styles.titleContainer}>
          <Typography variant="h5">{CHART_SUB_PAGE_TITLES[0]}</Typography>
        </div>
      </div>
    </div>
  );
};

Charts.propTypes = {
  hourly: PropTypes.arrayOf().isRequired,
};

export default Charts;
