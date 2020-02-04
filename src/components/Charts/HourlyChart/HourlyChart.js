import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import { getHourFromEpoch } from 'utils/dateTimeUtils';
import getHourlyChartOption from 'charts/hourlyChart';

const HomeChart = props => {
  const { hourlyData } = props;

  const [hourly, setHourly] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const newHourly = [];
    const newTimeline = [];

    for (const weatherHour of hourlyData) {
      newHourly.push(Math.round(weatherHour.temperature));
      newTimeline.push(`${getHourFromEpoch(weatherHour.time)}:00`);
    }

    setHourly(newHourly);
    setTimeline(newTimeline);
  }, [hourlyData]);

  return <ReactEcharts option={getHourlyChartOption(timeline, hourly)} />;
};

HomeChart.propTypes = {
  hourlyData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeChart;
