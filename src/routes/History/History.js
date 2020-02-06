import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';

import { WEEK_DAYS, MONTHS } from 'constants/constants';
import CalendarDay from 'components/CalendarDay/CalendarDay';
import styles from './History.module.css';

const getWeekDays = () => {
  return WEEK_DAYS.map(day => <th key={day}>{day}</th>);
};

const currentYear = new Date().getFullYear();

const daysInMonth = (iMonth, iYear) => {
  return 32 - new Date(iYear, iMonth, 32).getDate();
};

const History = props => {
  const { monthTemperature } = props;
  const [month, setMonth] = useState(new Date().getMonth());

  const changeOption = event => {
    setMonth(event.target.value);
  };

  const getTableContent = useCallback(() => {
    const firstDay = new Date(currentYear, month).getDay();
    const content = [];

    let date = 1;
    for (let i = 0; i < 6; i += 1) {
      // creates a table row
      const rowCells = [];

      // creating individual cells, filing them up with data.
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
  );
};

History.propTypes = {
  monthTemperature: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default History;
