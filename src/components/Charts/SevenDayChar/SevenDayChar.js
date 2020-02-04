import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import get7DaysChartOption from 'charts/sevenDayChart';
import { WEEK_DAYS } from 'constants/constants';
import { createDateFromEpoch } from 'utils/dateTimeUtils';

const SevenDayChar = props => {
  const { data } = props;

  const xLabel = [];
  const dayData = [];
  const nightData = [];

  if (data.length > 0) {
    xLabel.push('Today');
    dayData.push(Math.round(data[0].temperatureLow));
    nightData.push(Math.round(data[0].temperatureHigh));
  }

  for (let i = 1; i < data.length; i += 1) {
    const dataElement = data[i];
    xLabel.push(WEEK_DAYS[createDateFromEpoch(dataElement.time).getDay()]);
    dayData.push(Math.round(dataElement.temperatureLow));
    nightData.push(Math.round(dataElement.temperatureHigh));
  }

  return <ReactEcharts option={get7DaysChartOption(xLabel, dayData, nightData)} />;
};

SevenDayChar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SevenDayChar;
