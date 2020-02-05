import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import LineChart from 'components/Charts/LineChart/LineChart';
import { CHART_OPTIONS } from 'constants/constants';
import { createChartData } from 'utils/helperFunctions';

const Wind = props => {
  const { option, daily, hourly } = props;

  const [xLabelsDaily, setXLabelsDaily] = useState([]);
  const [dataArrayDaily, setDataArrayDaily] = useState([]);

  const [xLabelsHourly, setXLabelsHourly] = useState([]);
  const [dataArrayHourly, setDataArrayHourly] = useState([]);

  useEffect(() => {
    const [newXLabels, newDataArray] = createChartData(daily, { label: 'label', propName: 'windSpeed' }, );

    setXLabelsDaily(newXLabels);
    setDataArrayDaily(newDataArray);
  }, [daily]);

  useEffect(() => {
    const [newXLabels, newDataArray] = createChartData(hourly, { label: 'hour', propName: 'windSpeed' });

    setXLabelsHourly(newXLabels);
    setDataArrayHourly(newDataArray);
  }, [hourly]);

  let chart;
  if (CHART_OPTIONS[option] === CHART_OPTIONS[0]) {
    chart = <LineChart xLabels={xLabelsDaily} dataArray={dataArrayDaily} />;
  } else {
    chart = <LineChart xLabels={xLabelsHourly} dataArray={dataArrayHourly} />;
  }

  return <div>{chart}</div>;
};

Wind.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
  option: PropTypes.number.isRequired,
};

export default Wind;
