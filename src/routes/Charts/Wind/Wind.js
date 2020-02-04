import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import LineChart from 'components/Charts/LineChart/LineChart';
import { CHART_OPTIONS } from 'constants/constants';

const Wind = props => {
  const { option, daily, hourly } = props;

  const [xLabelsDaily, setXLabelsDaily] = useState([]);
  const [dataArrayDaily, setDataArrayDaily] = useState([]);

  const [xLabelsHourly, setXLabelsHourly] = useState([]);
  const [dataArrayHourly, setDataArrayHourly] = useState([]);

  console.log(daily);

  useEffect(() => {
    const newXLabelsDaily = [];
    const newDataArrayDaily = [];

    for (const day of daily) {
      newXLabelsDaily.push(day.label);
      newDataArrayDaily.push(day.windSpeed);
    }
    setXLabelsDaily(newXLabelsDaily);
    setDataArrayDaily(newDataArrayDaily);
  }, [daily]);

  let chart;
  if (CHART_OPTIONS[option] === CHART_OPTIONS[0]) {
    chart = <LineChart xLabels={xLabelsDaily} dataArray={dataArrayDaily} />;
  } else {
    chart = <LineChart xLabels={xLabelsHourly} dataArray={dataArrayHourly} />;
  }

  return <div>{chart}</div>;
};

Wind.propTypes = {};

export default Wind;
