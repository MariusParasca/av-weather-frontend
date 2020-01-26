import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'components/CircularProgress/CircularProgress';
import styles from './LabeledCircularProgress.module.css';

const LabeledCircularProgress = props => {
  const { progressValue, progressText, circularProgressSize, labelFontSize } = props;

  const containerSize = 2 * labelFontSize + circularProgressSize;

  console.log('containerSize', containerSize);

  return (
    <div className={styles.container} style={{ height: containerSize + 6, width: containerSize + 6 }}>
      <div className={styles.northContainer} style={{ width: containerSize + 6 }}>
        <span>N</span>
      </div>
      <div className={styles.westContainer} style={{ height: containerSize + 6 }}>
        <span>W</span>
      </div>
      <div className={styles.southContainer} style={{ width: containerSize + 6 }}>
        <span>S</span>
      </div>
      <div className={styles.estContainer} style={{ height: containerSize + 6 }}>
        <span>E</span>
      </div>
      {/* <div>E</div>
      <div>S</div>
      <div>W</div> */}
      <div style={{ position: 'absolute', top: labelFontSize + 3, left: labelFontSize + 3 }}>
        <CircularProgress
          size={circularProgressSize}
          percent={progressValue}
          text={!progressText ? progressValue : progressText}
        />
      </div>
    </div>
  );
};

LabeledCircularProgress.propTypes = {};

LabeledCircularProgress.propTypes = {
  progressValue: PropTypes.number.isRequired,
  progressText: PropTypes.string,
  circularProgressSize: PropTypes.number,
  labelFontSize: PropTypes.number,
};

LabeledCircularProgress.defaultProps = {
  progressText: undefined,
  circularProgressSize: 65,
  labelFontSize: 16,
};

export default LabeledCircularProgress;
