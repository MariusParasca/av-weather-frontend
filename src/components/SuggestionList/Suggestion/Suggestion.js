import React from 'react';
import PropTypes from 'prop-types';

import { Typography, makeStyles, IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import styles from './Suggestion.module.css';

const getColor = votes => {
  if (votes >= 15) {
    return '#3c399f';
  }
  if (votes >= 12) {
    return '#5453ab';
  }
  if (votes >= 9) {
    return '#6160b1';
  }
  if (votes >= 6) {
    return '#6d6db7';
  }
  if (votes >= 3) {
    return '#7a7abd';
  }
  if (votes >= 0) {
    return '#8383c1';
  }
  return '#9797cb';
};

const useStyles = makeStyles(() => ({
  votesTypo: {
    lineHeight: 2.3,
  },
  textTypo: {
    color: '#8383C1',
    lineHeight: 1.3,
    fontSize: '2vh',
  },
  arrowUpButton: {
    padding: '6px',
    marginRight: '4px',
  },
  arrowDownButton: {
    padding: '6px',
    marginLeft: '4px',
  },
}));

const Suggestion = props => {
  const { upVote, downVote, votes, text } = props;

  const classes = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <IconButton classes={{ root: classes.arrowUpButton }} onClick={upVote}>
          <ArrowUpwardIcon color="primary" />
        </IconButton>
        <div>
          <Typography
            classes={{ root: classes.votesTypo }}
            variant="subtitle2"
            className={styles.votes}
            style={{ borderColor: getColor(votes) }}
          >
            {votes}
          </Typography>
        </div>
        <IconButton classes={{ root: classes.arrowDownButton }} onClick={downVote}>
          <ArrowDownwardIcon color="primary" />
        </IconButton>
      </div>
      <Typography classes={{ root: classes.textTypo }} variant="subtitle1" className={styles.text}>
        {text}
      </Typography>
    </div>
  );
};

Suggestion.propTypes = {
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  votes: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Suggestion;
