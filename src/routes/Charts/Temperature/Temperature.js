import React from 'react';
import PropTypes from 'prop-types';

import HourlyChart from 'components/Charts/HourlyChart/HourlyChart';
import { CHART_OPTIONS } from 'constants/constants';
import SevenDayChar from 'components/Charts/SevenDayChar/SevenDayChar';

const Temperature = props => {
  const { hourly, daily, option } = props;

  let chart;
  if (CHART_OPTIONS[option] === CHART_OPTIONS[0]) {
    chart = <SevenDayChar data={daily} />;
  } else {
    chart = <HourlyChart hourlyData={hourly} />;
  }

  return <div>{chart}</div>;
};

Temperature.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
  option: PropTypes.number.isRequired,
};

export default Temperature;
