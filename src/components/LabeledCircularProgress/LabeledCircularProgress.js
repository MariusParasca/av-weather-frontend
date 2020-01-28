import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'components/CircularProgress/CircularProgress';
import styles from './LabeledCircularProgress.module.css';

const EXTRA_SIZE = 6;

const LabeledCircularProgress = props => {
  const { progressValue, progressText, circularProgressSize, labelFontSize, activeColor } = props;

  const containerSize = 2 * labelFontSize + circularProgressSize;

  const northColor = progressValue > 0 ? activeColor : 'inherit';
  const westColor = progressValue >= 25 ? activeColor : 'inherit';
  const southColor = progressValue >= 50 ? activeColor : 'inherit';
  const estColor = progressValue >= 75 ? activeColor : 'inherit';

  return (
    <div className={styles.container} style={{ height: containerSize + EXTRA_SIZE, width: containerSize + EXTRA_SIZE }}>
      <div className={styles.northContainer} style={{ width: containerSize + EXTRA_SIZE, color: northColor }}>
        <span>N</span>
      </div>
      <div className={styles.westContainer} style={{ height: containerSize + EXTRA_SIZE, color: westColor }}>
        <span>W</span>
      </div>
      <div className={styles.southContainer} style={{ width: containerSize + EXTRA_SIZE, color: southColor }}>
        <span>S</span>
      </div>
      <div className={styles.estContainer} style={{ height: containerSize + EXTRA_SIZE, color: estColor }}>
        <span>E</span>
      </div>
      <div style={{ position: 'absolute', top: labelFontSize + EXTRA_SIZE / 2, left: labelFontSize + EXTRA_SIZE / 2 }}>
        <CircularProgress
          size={circularProgressSize}
          percent={progressValue}
          text={!progressText ? String(progressValue) : progressText}
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
  activeColor: PropTypes.string,
};

LabeledCircularProgress.defaultProps = {
  progressText: undefined,
  circularProgressSize: 70,
  labelFontSize: 16,
  activeColor: '#FF9F1E',
};

export default LabeledCircularProgress;
