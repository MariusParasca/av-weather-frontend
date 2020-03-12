import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import get7DaysChartOption from 'charts/sevenDayChart';
import { WEEK_DAYS } from 'constants/constants';
import { createDateFromEpoch } from 'utils/dateTimeUtils';

const SevenDayChar = props => {
  const { data, style } = props;

  const xLabel = [];
  const dayData = [];
  const nightData = [];

  if (data.length > 0) {
    xLabel.push('Today');
    dayData.push(Math.round(data[0].temperatureHigh));
    nightData.push(Math.round(data[0].temperatureLow));
  }

  for (let i = 1; i < data.length; i += 1) {
    const dataElement = data[i];
    xLabel.push(WEEK_DAYS[createDateFromEpoch(dataElement.time).getDay()]);
    dayData.push(Math.round(dataElement.temperatureHigh));
    nightData.push(Math.round(dataElement.temperatureLow));
  }

  return <ReactEcharts style={style} option={get7DaysChartOption(xLabel, dayData, nightData)} />;
};

SevenDayChar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};

SevenDayChar.defaultProps = {
  style: {
    height: '100%',
  },
};

export default SevenDayChar;
