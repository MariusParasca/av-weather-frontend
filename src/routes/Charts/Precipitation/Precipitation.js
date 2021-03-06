import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import BarChart from 'components/Charts/BarChart/BarChart';
import { CHART_OPTIONS } from 'constants/constants';
import { createChartData } from 'utils/helperFunctions';

const Precipitation = props => {
  const { option, daily, hourly } = props;

  const [xLabelsDaily, setXLabelsDaily] = useState([]);
  const [dataArrayDaily, setDataArrayDaily] = useState([]);
  const [fullBarArray, setFullBarArray] = useState([]);

  const [xLabelsHourly, setXLabelsHourly] = useState([]);
  const [dataArrayHourly, setDataArrayHourly] = useState([]);
  const [fullBarArrayHourly, setFullBarArrayHourly] = useState([]);

  useEffect(() => {
    const [newXLabels, newDataArray, newFullBar] = createChartData(
      daily,
      { label: 'label', propName: 'precipProbability' },
      { round: true, toPercent: true, additionalArray: true },
    );

    setXLabelsDaily(newXLabels);
    setDataArrayDaily(newDataArray);
    setFullBarArray(newFullBar);
  }, [daily]);

  useEffect(() => {
    const [newXLabels, newDataArray, newFullBar] = createChartData(
      hourly,
      { label: 'hour', propName: 'precipProbability' },
      { round: true, toPercent: true, additionalArray: true },
    );

    setXLabelsHourly(newXLabels);
    setDataArrayHourly(newDataArray);
    setFullBarArrayHourly(newFullBar);
  }, [hourly]);

  let chart;
  if (CHART_OPTIONS[option] === CHART_OPTIONS[0]) {
    chart = <BarChart xLabels={xLabelsDaily} dataArray={dataArrayDaily} fullBarArray={fullBarArray} />;
  } else {
    chart = <BarChart xLabels={xLabelsHourly} dataArray={dataArrayHourly} fullBarArray={fullBarArrayHourly} />;
  }

  return chart;
};

Precipitation.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
  option: PropTypes.number.isRequired,
};

export default Precipitation;
