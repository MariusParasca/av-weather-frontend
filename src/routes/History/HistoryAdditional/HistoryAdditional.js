import React from 'react';
// import PropTypes from 'prop-types';

import PieChart from 'components/Charts/PieChart/PieChart';
import styles from './HistoryAdditional.module.css';

const HistoryAdditional = props => {
  return (
    <div className={styles.container}>
      <PieChart />
    </div>
  );
};

HistoryAdditional.propTypes = {};

export default HistoryAdditional;
