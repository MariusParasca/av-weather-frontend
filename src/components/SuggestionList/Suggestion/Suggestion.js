import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Typography, makeStyles, IconButton, TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import { updateTextField } from 'utils/helperFunctions';
import { useSelector } from 'react-redux';
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
  deleteButton: {
    padding: '6px',
  },
  input: {
    padding: '10px 14px',
  },
  textField: {
    marginRight: '10px',
    marginLeft: '10px',
  },
}));

const Suggestion = props => {
  const { upVote, downVote, deleteSuggestion, editSuggestion, votes, text, showAdminActions, index } = props;

  const classes = useStyles();

  const suggestions = useSelector(state => state.suggestions);

  const [editedText, setEditedText] = useState(text);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [helperText, setHelperText] = useState('');
  const [errorText, setErrorText] = useState(false);

  const openEdit = useCallback(() => {
    setIsOpenEdit(!isOpenEdit);
  }, [isOpenEdit]);

  const onClickEdit = useCallback(() => {
    editSuggestion(index, editedText);
  }, [editSuggestion, editedText, index]);

  return (
    <div className={styles.container}>
      {isOpenEdit ? (
        <>
          <TextField
            classes={{ root: classes.textField }}
            InputProps={{ classes: { root: classes.input } }}
            multiline
            value={editedText}
            helperText={helperText}
            error={errorText}
            onChange={updateTextField(setEditedText, () => {
              setHelperText('');
              setErrorText(false);
            })}
            fullWidth
            color="primary"
            variant="outlined"
          />
          <ButtonWithSpinner loading={suggestions.pendingEdit} onClick={onClickEdit}>
            Edit
          </ButtonWithSpinner>
        </>
      ) : (
        <>
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
        </>
      )}
      {showAdminActions && (
        <>
          <IconButton classes={{ root: classes.deleteButton }} onClick={openEdit}>
            <EditIcon color="primary" />
          </IconButton>
          {!isOpenEdit ? (
            <IconButton classes={{ root: classes.deleteButton }} onClick={deleteSuggestion}>
              <CloseIcon color="primary" />
            </IconButton>
          ) : null}
        </>
      )}
    </div>
  );
};

Suggestion.propTypes = {
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  votes: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  showAdminActions: PropTypes.bool,
  deleteSuggestion: PropTypes.func.isRequired,
  editSuggestion: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

Suggestion.defaultProps = {
  showAdminActions: false,
};

export default Suggestion;
