import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Forecast from 'components/Forecast/Forecast';
import TodayWeatherInfo from 'components/TodayWeatherInfo/TodayWeatherInfo';
import HomeChart from 'components/Charts/HomeChart/HomeChart';
import { WEEK_DAYS } from 'constants/constants';
import { createDateFromEpoch } from 'utils/dateTimeUtils';
import { flatten } from 'utils/helperFunctions';
import { Slider, withStyles } from '@material-ui/core';
import styles from './Home.module.css';

const AirbnbSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus,&:hover,&$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
    '& .bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

const getToday = (weatherHourly, indexFirstDay) => {
  const xLabelCurrent = [];
  const actualTempCurrent = [];
  const feelsLikeCurrent = [];

  for (let i = 0; i < indexFirstDay; i += 1) {
    const dataElement = weatherHourly[i];
    xLabelCurrent.push(`Today (${dataElement.hour})`);
    actualTempCurrent.push(Math.round(dataElement.temperature));
    feelsLikeCurrent.push(Math.round(dataElement.apparentTemperature));
  }

  return [xLabelCurrent, actualTempCurrent, feelsLikeCurrent];
};

const Home = props => {
  const { weatherForecast, weatherHourly } = props;

  const [modifiedWeatherForecast, setModifiedWeatherForecast] = useState([]);

  const [weekDaysHighLight, setWeekDaysHighLight] = useState([false, false, false, false, false, false, false]);

  const [xLabel, setXLabel] = useState([]);
  const [actualTemp, setActualTemp] = useState([]);
  const [feelsLike, setFeelsLike] = useState([]);
  const [sliderValue, setSliderValue] = useState([0, 0]);

  const [xLabelArr, setXLabelArr] = useState([]);
  const [actualTempArr, setActualTempArr] = useState([]);
  const [feelsLikeArr, setFeelsLikeArr] = useState([]);

  const handleChange = (event, newValue) => {
    const newWeekDaysHighLight = [...weekDaysHighLight];
    const xLabelArray = [];
    const actualTempArray = [];
    const feelsLikeArray = [];
    let counter = 0;
    for (let i = 0; i <= 16; i += 2) {
      if (newValue[0] <= i && i + 1 <= newValue[1]) {
        newWeekDaysHighLight[counter] = true;
        xLabelArray.push(xLabelArr[counter]);
        actualTempArray.push(actualTempArr[counter]);
        feelsLikeArray.push(feelsLikeArr[counter]);
      } else {
        newWeekDaysHighLight[counter] = false;
      }
      counter += 1;
    }
    setWeekDaysHighLight(newWeekDaysHighLight);
    setSliderValue(newValue);

    setXLabel(flatten(xLabelArray));
    setActualTemp(flatten(actualTempArray));
    setFeelsLike(flatten(feelsLikeArray));
  };

  useEffect(() => {
    const xLabelArray = [];
    const actualTempArray = [];
    const feelsLikeArray = [];
    const newWeekDaysHighLight = [false, false, false, false, false, false, false];

    let index = 1;
    newWeekDaysHighLight[0] = true;

    const currentHour = +weatherHourly[0].hour.split(':')[0];
    const indexFirstDay = 23 - currentHour + 1;

    const [xLabelToday, actualToday, feelsToday] = getToday(weatherHourly, indexFirstDay);
    xLabelArray.push(xLabelToday);
    actualTempArray.push(actualToday);
    feelsLikeArray.push(feelsToday);

    let label = WEEK_DAYS[createDateFromEpoch(weatherHourly[indexFirstDay].time).getDay()];
    let counter = 0;
    let xLabelCurrent = [];
    let actualTempCurrent = [];
    let feelsLikeCurrent = [];
    for (let i = indexFirstDay; i < weatherHourly.length - 1; i += 1) {
      const dataElement = weatherHourly[i];
      if (counter === 24) {
        newWeekDaysHighLight[index] = true;
        index += 1;
        counter = 1;
        label = WEEK_DAYS[createDateFromEpoch(dataElement.time).getDay()];
        xLabelArray.push(xLabelCurrent);
        actualTempArray.push(actualTempCurrent);
        feelsLikeArray.push(feelsLikeCurrent);
        xLabelCurrent = [];
        actualTempCurrent = [];
        feelsLikeCurrent = [];
      } else {
        counter += 1;
      }
      xLabelCurrent.push(`${label} (${dataElement.hour})`);
      actualTempCurrent.push(Math.round(dataElement.temperature));
      feelsLikeCurrent.push(Math.round(dataElement.apparentTemperature));
    }
    newWeekDaysHighLight[index] = true;
    xLabelArray.push(xLabelCurrent);
    actualTempArray.push(actualTempCurrent);
    feelsLikeArray.push(feelsLikeCurrent);

    setSliderValue([0, (index + 1) * 2]);
    setWeekDaysHighLight(newWeekDaysHighLight);

    setXLabel(flatten(xLabelArray));
    setActualTemp(flatten(actualTempArray));
    setFeelsLike(flatten(feelsLikeArray));

    setXLabelArr(xLabelArray);
    setActualTempArr(actualTempArray);
    setFeelsLikeArr(feelsLikeArray);
  }, [weatherHourly]);

  useEffect(() => {
    setModifiedWeatherForecast(
      weatherForecast.map(el => ({
        label: el.label,
        temperatureNight: el.temperatureLow,
        temperatureDay: el.temperatureHigh,
        svg: `svgs/TypeOfWeather/Forecast/${el.icon}.svg`,
      })),
    );
  }, [weatherForecast]);

  return (
    <div className={styles.container}>
      <div className={styles.forecastContainer}>
        <div className={styles.chartContainer}>
          <HomeChart xLabel={xLabel} actualTemp={actualTemp} feelsLike={feelsLike} />
        </div>
        <div className={styles.sliderContainer}>
          <AirbnbSlider
            onChange={handleChange}
            ThumbComponent={AirbnbThumbComponent}
            step={2}
            min={0}
            max={16}
            value={sliderValue}
          />
        </div>
        <Forecast weekDaysHighLight={weekDaysHighLight} forecastTemperature={modifiedWeatherForecast} />
      </div>
      <TodayWeatherInfo isLoading={false} />
    </div>
  );
};

Home.propTypes = {
  weatherForecast: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      temperatureNight: PropTypes.number,
      temperatureDay: PropTypes.number,
    }),
  ).isRequired,
  weatherHourly: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Home;
