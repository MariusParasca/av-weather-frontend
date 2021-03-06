import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LineChart from 'components/Charts/LineChart/LineChart';
import { CHART_OPTIONS } from 'constants/constants';
import { createChartData } from 'utils/helperFunctions';

const Pressure = props => {
  const { option, daily, hourly } = props;

  const [xLabelsDaily, setXLabelsDaily] = useState([]);
  const [dataArrayDaily, setDataArrayDaily] = useState([]);

  const [xLabelsHourly, setXLabelsHourly] = useState([]);
  const [dataArrayHourly, setDataArrayHourly] = useState([]);

  useEffect(() => {
    const [newXLabels, newDataArray] = createChartData(
      daily,
      { label: 'label', propName: 'pressure' },
      { round: true },
    );

    setXLabelsDaily(newXLabels);
    setDataArrayDaily(newDataArray);
  }, [daily]);

  useEffect(() => {
    const [newXLabels, newDataArray] = createChartData(
      hourly,
      { label: 'hour', propName: 'pressure' },
      { round: true },
    );

    setXLabelsHourly(newXLabels);
    setDataArrayHourly(newDataArray);
  }, [hourly]);

  let chart;
  if (CHART_OPTIONS[option] === CHART_OPTIONS[0]) {
    chart = <LineChart xLabels={xLabelsDaily} dataArray={dataArrayDaily} />;
  } else {
    chart = <LineChart xLabels={xLabelsHourly} dataArray={dataArrayHourly} />;
  }

  return chart;
};

Pressure.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
  option: PropTypes.number.isRequired,
};

export default Pressure;
