import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getHourFromEpoch } from 'utils/dateTimeUtils';
import HourlyChart from 'components/Charts/HourlyChart/HourlyChart';
import { CHART_OPTIONS } from 'constants/constants';
import SevenDayChar from 'components/Charts/SevenDayChar/SevenDayChar';

const Temperature = props => {
  const { hourly, daily, option } = props;

  const [hourlyState, setHourlyState] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [feelsLike, setFeelsLike] = useState([]);
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);

  console.log('maxTemp', maxTemp);
  console.log('minTemp', minTemp);

  useEffect(() => {
    const newHourly = [];
    const newTimeline = [];
    const newFeelsLike = [];
    let min = hourly[0].temperature;
    let max = hourly[0].apparentTemperature;

    for (const weatherHour of hourly) {
      min = Math.min(weatherHour.temperature, weatherHour.apparentTemperature, min);
      max = Math.max(weatherHour.temperature, weatherHour.apparentTemperature, max);
      newHourly.push(Math.round(weatherHour.temperature));
      newFeelsLike.push(Math.round(weatherHour.apparentTemperature));
      newTimeline.push(`${getHourFromEpoch(weatherHour.time)}:00`);
    }

    setMaxTemp(Math.round(max));
    setMinTemp(Math.round(min));
    setFeelsLike(newFeelsLike);
    setHourlyState(newHourly);
    setTimeline(newTimeline);
  }, [hourly]);

  let chart;
  if (CHART_OPTIONS[option] === CHART_OPTIONS[0]) {
    chart = <SevenDayChar data={daily} />;
  } else {
    chart = <HourlyChart timeline={timeline} hourly={hourlyState} feelsLike={feelsLike} min={minTemp} max={maxTemp} />;
  }

  return chart;
};

Temperature.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
  option: PropTypes.number.isRequired,
};

export default Temperature;
