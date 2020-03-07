import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHomeChartOption from 'charts/homeChartOption';
import { WEEK_DAYS } from 'constants/constants';
import { createDateFromEpoch } from 'utils/dateTimeUtils';
import { compareArrays } from 'utils/helperFunctions';
import { useSelector } from 'react-redux';
// import { SET_DAYS_HIGHLIGHT } from 'store/actionTypes/userSettingsActionTypes';

const getIndexByPercent = (percent, total) => Math.floor((percent * total) / 100);

const HomeChart = props => {
  const { data } = props;
  const [chart, setChart] = useState(null);

  // const dispatch = useDispatch();

  const weekDaysHighLight = useSelector(state => state.userSettings.weekDaysHighLight);

  const xLabel = [];
  const actualTemp = [];
  const feelsLike = [];
  let counter = 0;
  let label = 'Today';

  for (let i = 0; i < data.length - 1; i += 1) {
    const dataElement = data[i];
    if (counter === 25) {
      counter = 1;
      label = WEEK_DAYS[createDateFromEpoch(dataElement.time).getDay()];
      xLabel.push(label);
    } else {
      counter += 1;
      xLabel.push(label);
    }
    actualTemp.push(Math.round(dataElement.temperature));
    feelsLike.push(Math.round(dataElement.apparentTemperature));
  }

  return (
    <ReactEcharts
      onEvents={{
        datazoom: action => {
          const newWeekDaysHighLight = [...weekDaysHighLight];
          const { length } = chart.getModel().option.xAxis[0].data;

          for (let i = getIndexByPercent(action.start, length); i < getIndexByPercent(action.end, length); i += 1) {
            newWeekDaysHighLight[Math.floor(i / 24)] = true;
          }

          if (!compareArrays(newWeekDaysHighLight, weekDaysHighLight)) {
            // dispatch({ type: SET_DAYS_HIGHLIGHT, weekDaysHighLight: newWeekDaysHighLight });
          }
          // chart.dispatchAction({
          //   type: 'datazoom',
          //   start: 50,
          //   end: 100,
          // });
        },
      }}
      style={{
        height: '120%',
      }}
      onChartReady={object => {
        if (!chart) {
          setChart(object);
        }
      }}
      option={getHomeChartOption(xLabel, actualTemp, feelsLike)}
    />
  );
};

HomeChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeChart;
