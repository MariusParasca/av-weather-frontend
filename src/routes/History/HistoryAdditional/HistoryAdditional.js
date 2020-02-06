import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import PieChart from 'components/Charts/PieChart/PieChart';

const HistoryAdditional = props => {
  return (
    <div>
      <PieChart />
    </div>
  );
};

HistoryAdditional.propTypes = {};

export default HistoryAdditional;
