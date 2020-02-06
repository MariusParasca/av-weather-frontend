import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Typography, makeStyles } from '@material-ui/core';

import { ReactComponent as Humidity } from 'svgs/humidity.svg';
import { ReactComponent as Precipitation } from 'svgs/precipitation.svg';
import { WEEK_DAYS, MONTHS } from 'constants/constants';
import CalendarDay from 'components/CalendarDay/CalendarDay';
import WithSvg from 'components/WithSvg/WithSvg';
import Wind from 'components/Wind/Wind';
import WeatherInfo from 'components/TodayWeatherInfo/WeatherInfo/WeatherInfo';
import RightBottomContainer from 'components/RightBottomContainer/RightBottomContainer';
import styles from './History.module.css';

const useStyles = makeStyles(theme => ({
  typeRoot: {
    fontSize: '1.8rem',
  },
}));

const getWeekDays = () => {
  return WEEK_DAYS.map(day => <th key={day}>{day}</th>);
};

const currentYear = new Date().getFullYear();

const daysInMonth = (iMonth, iYear) => {
  return 32 - new Date(iYear, iMonth, 32).getDate();
};

const History = props => {
  const { monthTemperature, maxWind, precipitation, humidity } = props;

  const classes = useStyles();

  const [month, setMonth] = useState(new Date().getMonth());

  const changeOption = event => {
    setMonth(event.target.value);
  };

  const getTableContent = useCallback(() => {
    const firstDay = new Date(currentYear, month).getDay();
    const content = [];

    let date = 1;
    for (let i = 0; i < 6; i += 1) {
      const rowCells = [];

      for (let j = 0; j < 7; j += 1) {
        if (i === 0 && j < firstDay) {
          rowCells.push({ key: `${i}${j}` });
        } else if (date > daysInMonth(month, currentYear)) {
          break;
        } else {
          rowCells.push({
            key: `${i}${j}`,
            dayNumber: date,
            dayTemperature: monthTemperature[date - 1] ? monthTemperature[date - 1].dayTemperature : 0,
            nightTemperature: monthTemperature[date - 1] ? monthTemperature[date - 1].nightTemperature : 0,
          });
          date += 1;
        }
      }
      content.push(rowCells);
    }

    return content;
  }, [month, monthTemperature]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.selectContainer}>
          <TextField select onChange={changeOption} value={month}>
            {MONTHS.map((option, index) => (
              <MenuItem key={option} value={index}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <table className={styles.calendarTable}>
          <thead>
            <tr>{getWeekDays()}</tr>
          </thead>
          <tbody>
            {getTableContent().map((row, index) => (
              <tr key={WEEK_DAYS[index]}>
                {row.map(cell => {
                  if (cell.dayNumber) {
                    return (
                      <td key={cell.key}>
                        <CalendarDay
                          dayNumber={cell.dayNumber}
                          dayTemperature={cell.dayTemperature}
                          nightTemperature={cell.nightTemperature}
                        />
                      </td>
                    );
                  }
                  return <td key={cell.key} />;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RightBottomContainer>
        <div className={styles.textInfoContainer}>
          <div className={styles.textInfo}>
            <Typography variant="h5">Clear days</Typography>
            <Typography variant="h5" classes={{ root: classes.typeRoot }}>
              2
            </Typography>
          </div>
          <div className={styles.textInfo}>
            <Typography variant="h5">Partly cloudy days</Typography>
            <Typography variant="h5" classes={{ root: classes.typeRoot }}>
              10
            </Typography>
          </div>
          <div className={styles.textInfo}>
            <Typography variant="h5">Cloudy days</Typography>
            <Typography variant="h5" classes={{ root: classes.typeRoot }}>
              14
            </Typography>
          </div>
          <div className={styles.textInfo}>
            <Typography variant="h5">Rainy days</Typography>
            <Typography variant="h5" classes={{ root: classes.typeRoot }}>
              5
            </Typography>
          </div>
          <Wind maxWind={maxWind} />
        </div>
        <div className={styles.otherContainer}>
          <WeatherInfo progressValue={humidity * 100} text="Humidity" withPercent>
            <WithSvg component={Humidity} size={20} />
          </WeatherInfo>
          <WeatherInfo progressValue={precipitation * 100} text="Precipitation" withPercent>
            <WithSvg component={Precipitation} size={20} />
          </WeatherInfo>
        </div>
      </RightBottomContainer>
    </div>
  );
};

History.propTypes = {
  monthTemperature: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default History;
