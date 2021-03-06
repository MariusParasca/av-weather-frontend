import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import Forecast from 'components/Forecast/Forecast';
import HomeChart from 'components/Charts/HomeChart/HomeChart';
import { flatten, createBarChartWithGradient, getMinArray, getMaxArray } from 'utils/helperFunctions';
import { Slider, withStyles } from '@material-ui/core';
import CurrentWeather from 'components/CurrentWeather/CurrentWeather';
import HomeSearchBox from 'components/HomeSearchBox/HomeSearchBox';
import { useSelector } from 'react-redux';
import styles from './Home.module.css';

const CustomSlider = withStyles({
  root: {
    color: '#131231',
    height: 6,
    padding: '13px 0',
  },
  thumb: {
    height: 22,
    width: 22,
    backgroundColor: '#6C66FA',
    borderRadius: '3px',
    marginTop: -9,
    marginLeft: -13,
    // '&:focus,&:hover,&$active': {
    //   boxShadow: '#ccc 0px 2px 3px 1px',
    // },
    '& .square': {
      height: 7,
      width: 7,
      backgroundColor: '#131231',
      borderRadius: '3px',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 6,
  },
  rail: {
    color: '#3A3966',
    opacity: 1,
    height: 6,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span {...props}>
      <span className="square" />
    </span>
  );
}

const getToday = (hourly, indexFirstDay) => {
  const xLabelCurrent = [];
  const actualTempCurrent = [];
  const feelsLikeCurrent = [];

  const todayData = hourly.slice(0, indexFirstDay);
  const minActual = Math.round(getMinArray(todayData, el => el.temperature));
  const maxActual = Math.round(getMaxArray(todayData, el => el.temperature));
  const minFeelLike = Math.round(getMinArray(todayData, el => el.apparentTemperature));
  const maxFeelLike = Math.round(getMaxArray(todayData, el => el.apparentTemperature));

  for (let i = 0; i < todayData.length; i += 1) {
    const dataElement = hourly[i];
    xLabelCurrent.push(`${dataElement.hourAMPM}`);
    actualTempCurrent.push(createBarChartWithGradient(Math.round(dataElement.temperature), minActual, maxActual));
    feelsLikeCurrent.push(
      createBarChartWithGradient(Math.round(dataElement.apparentTemperature), minFeelLike, maxFeelLike),
    );
  }

  return [xLabelCurrent, actualTempCurrent, feelsLikeCurrent];
};

const initVars = array => {
  const minActual = Math.round(getMinArray(array, el => el.temperature));
  const maxActual = Math.round(getMaxArray(array, el => el.temperature));
  const minFeelLike = Math.round(getMinArray(array, el => el.apparentTemperature));
  const maxFeelLike = Math.round(getMaxArray(array, el => el.apparentTemperature));
  return {
    xLabelCurrent: [],
    actualTempCurrent: [],
    feelsLikeCurrent: [],
    minActual,
    maxActual,
    minFeelLike,
    maxFeelLike,
  };
};

const Home = () => {
  const locationData = useSelector(state => state.weatherData.location);
  const currently = useSelector(state => state.weatherData.weather.currently);
  const hourly = useSelector(state => state.weatherData.weather.sevenDayHourly);
  const daily = useSelector(state => state.weatherData.weather.daily);

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

    const currentHour = +hourly[0].hour.split(':')[0];
    const indexFirstDay = 23 - currentHour + 1;

    const [xLabelToday, actualToday, feelsToday] = getToday(hourly, indexFirstDay);
    xLabelArray.push(xLabelToday);
    actualTempArray.push(actualToday);
    feelsLikeArray.push(feelsToday);

    // let label = WEEK_DAYS[createDateFromEpoch(hourly[indexFirstDay].time).getDay()];
    let counter = 0;
    let data = initVars(hourly.slice(indexFirstDay, indexFirstDay + 24));
    for (let i = indexFirstDay; i < hourly.length - 1; i += 1) {
      const dataElement = hourly[i];
      if (counter === 24) {
        if (index < 3) newWeekDaysHighLight[index] = true;
        index += 1;
        counter = 1;
        // label = WEEK_DAYS[createDateFromEpoch(dataElement.time).getDay()];
        xLabelArray.push(data.xLabelCurrent);
        actualTempArray.push(data.actualTempCurrent);
        feelsLikeArray.push(data.feelsLikeCurrent);
        data = initVars(hourly.slice(i, i + 24));
      } else {
        counter += 1;
      }
      data.xLabelCurrent.push(`${dataElement.hourAMPM}`);
      data.actualTempCurrent.push(
        createBarChartWithGradient(Math.round(dataElement.temperature), data.minActual, data.maxActual),
      );
      data.feelsLikeCurrent.push(
        createBarChartWithGradient(Math.round(dataElement.apparentTemperature), data.minFeelLike, data.maxFeelLike),
      );
    }
    // newWeekDaysHighLight[index] = true;
    xLabelArray.push(data.xLabelCurrent);
    actualTempArray.push(data.actualTempCurrent);
    feelsLikeArray.push(data.feelsLikeCurrent);

    setSliderValue([0, 6]); // 6 -> means 3 days the step is by 2
    setWeekDaysHighLight(newWeekDaysHighLight);

    setXLabel(flatten(xLabelArray.slice(0, 3)));
    setActualTemp(flatten(actualTempArray.slice(0, 3)));
    setFeelsLike(flatten(feelsLikeArray.slice(0, 3)));

    setXLabelArr(xLabelArray);
    setActualTempArr(actualTempArray);
    setFeelsLikeArr(feelsLikeArray);
  }, [hourly]);

  useEffect(() => {
    setModifiedWeatherForecast(
      daily.map(el => ({
        label: el.label,
        temperatureNight: el.temperatureLow,
        temperatureDay: el.temperatureHigh,
        svg: `svgs/TypeOfWeather/Forecast/${el.icon}.svg`,
      })),
    );
  }, [daily]);

  return (
    <>
      <div className={styles.topContainer}>
        <CurrentWeather
          className={styles.leftWeatherContainer}
          city={locationData.city}
          country={locationData.country}
          imageName={currently.imageName}
          weatherData={currently}
          sunsetTime={currently.sunsetTime}
          sunriseTime={currently.sunriseTime}
        />
        <HomeSearchBox />
      </div>
      <div className={styles.container}>
        <div className={styles.forecastContainer}>
          {/* <div className={styles.chartTitleContainer}>
          <Typography variant="subtitle1">Hourly chart</Typography>
        </div> */}
          <div className={styles.chartContainer}>
            <div className={styles.chartContainerWrapper}>
              <HomeChart xLabel={xLabel} actualTemp={actualTemp} feelsLike={feelsLike} />
            </div>
          </div>
          <div>
            <div className={styles.sliderContainer}>
              <CustomSlider
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
        </div>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
