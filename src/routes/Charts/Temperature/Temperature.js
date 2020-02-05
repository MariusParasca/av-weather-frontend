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

  useEffect(() => {
    const newHourly = [];
    const newTimeline = [];

    for (const weatherHour of hourly) {
      newHourly.push(Math.round(weatherHour.temperature));
      newTimeline.push(`${getHourFromEpoch(weatherHour.time)}:00`);
    }

    setHourlyState(newHourly);
    setTimeline(newTimeline);
  }, [hourly]);

  let chart;
  if (CHART_OPTIONS[option] === CHART_OPTIONS[0]) {
    chart = <SevenDayChar data={daily} />;
  } else {
    chart = <HourlyChart timeline={timeline} hourly={hourlyState} />;
  }

  return <div>{chart}</div>;
};

Temperature.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
  option: PropTypes.number.isRequired,
};

export default Temperature;
