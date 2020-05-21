import React, { useCallback, useState } from 'react';
// import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { TextField, makeStyles, IconButton, Modal, Grid } from '@material-ui/core';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import {
  POST_SUGGESTION_SEND,
  UP_VOTE_SUGGESTION_SEND,
  DELETE_SUGGESTION_SEND,
  EDIT_SUGGESTION_SEND,
} from 'store/actionTypes/suggestionActionTypes';
import { updateTextField, setTextFieldError } from 'utils/helperFunctions';
import { getSuggestionsDB } from 'utils/stateGetters';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { getSuggestionsQuery } from 'utils/firestoreQueries';
import { adminPin } from 'utils/config';
import Spinner from 'components/Spinner/Spinner';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Suggestion from './Suggestion/Suggestion';
import styles from './SuggestionList.module.css';

const useStyles = makeStyles(() => ({
  input: {
    padding: '10px 14px',
  },
  textField: {
    marginRight: '10px',
  },
  pinNumber: {
    '&': {
      fontSize: '22px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #8383C1',
      cursor: 'pointer',
    },
    '&:hover': {
      backgroundColor: '#221f57',
    },
  },
}));

const SuggestionList = () => {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [helperText, setHelperText] = useState('');
  const [errorText, setErrorText] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPinError, setIsPinError] = useState(false);

  const [pin, setPin] = useState('');

  const toggleIsOpen = useCallback((setState, state) => () => setState(!state), []);

  const dispatch = useDispatch();

  useFirestoreConnect(getSuggestionsQuery());

  const authFirebase = useSelector(state => state.firebase.auth);

  const suggestions = useSelector(state => state.suggestions);

  const suggestionsDB = useSelector(getSuggestionsDB);

  const onClickPin = useCallback(
    number => {
      if (pin.length < 4) {
        setPin(`${pin}${number}`);
      }
    },
    [pin],
  );

  const onClickDel = useCallback(() => {
    setPin(pin.slice(0, -1));
    setIsPinError(false);
  }, [pin]);

  const onClickOk = useCallback(() => {
    if (pin === adminPin) {
      setIsAdmin(true);
      setIsModalOpen(false);
      setPin('');
    } else {
      setIsPinError(true);
    }
  }, [pin]);

  const onClickPost = useCallback(() => {
    if (text.length < 10) {
      setTextFieldError(setErrorText, setHelperText, 'Your suggestion need to be at least 10 characters long');
    } else {
      dispatch({ type: POST_SUGGESTION_SEND, text });
      setText('');
    }
  }, [dispatch, text]);

  const onUpVote = useCallback(
    index => {
      dispatch({ type: UP_VOTE_SUGGESTION_SEND, id: suggestionsDB[index].id, votes: suggestionsDB[index].votes + 1 });
    },
    [dispatch, suggestionsDB],
  );

  const onDownVote = useCallback(
    index => {
      dispatch({ type: UP_VOTE_SUGGESTION_SEND, id: suggestionsDB[index].id, votes: suggestionsDB[index].votes - 1 });
    },
    [dispatch, suggestionsDB],
  );

  const onClickDelete = useCallback(
    index => {
      dispatch({ type: DELETE_SUGGESTION_SEND, id: suggestionsDB[index].id });
    },
    [dispatch, suggestionsDB],
  );

  const onClickEdit = useCallback(
    (index, editedText) => {
      dispatch({ type: EDIT_SUGGESTION_SEND, id: suggestionsDB[index].id, text: editedText });
    },
    [dispatch, suggestionsDB],
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.adminIcon}>
          <IconButton onClick={toggleIsOpen(setIsModalOpen, isModalOpen)}>
            <SupervisorAccountIcon color="primary" />
          </IconButton>
        </div>
        <div className={styles.sidebar}>
          <h1 className={styles.title}>
            <span>Your</span> Suggestions
          </h1>
        </div>

        <div className={styles.suggestions}>
          {authFirebase.isEmpty ? (
            <h1>Login to write/see suggestions</h1>
          ) : (
            <>
              <div className={styles.inputWrapper}>
                <TextField
                  classes={{ root: classes.textField }}
                  InputProps={{ classes: { root: classes.input } }}
                  multiline
                  fullWidth
                  variant="outlined"
                  placeholder="Write your suggestion here"
                  onChange={updateTextField(setText, () => {
                    setHelperText('');
                    setErrorText(false);
                  })}
                  value={text}
                  helperText={helperText}
                  error={errorText}
                />
                <ButtonWithSpinner loading={suggestions.pending} onClick={onClickPost}>
                  Post
                </ButtonWithSpinner>
              </div>
              {!isLoaded(suggestionsDB) ? (
                <Spinner />
              ) : (
                suggestionsDB.map((suggestion, index) => (
                  <Suggestion
                    index={index}
                    key={suggestion.text}
                    votes={suggestion.votes}
                    text={suggestion.text}
                    upVote={() => onUpVote(index)}
                    downVote={() => onDownVote(index)}
                    deleteSuggestion={() => onClickDelete(index)}
                    editSuggestion={onClickEdit}
                    showAdminActions={isAdmin}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
      <Modal open={isModalOpen} onClose={toggleIsOpen(setIsModalOpen, isModalOpen)}>
        <div className={styles.modalWrapper}>
          <div className={`${styles.modalContainer} ${isPinError ? styles.errorBorder : ''}`}>
            <div className={styles.dotsContainer}>
              {pin.split('').map(char => (
                <div key={char} className={styles.dot} />
              ))}
            </div>
            <Grid container>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(1)}>
                1
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(2)}>
                2
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(3)}>
                3
              </Grid>

              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(4)}>
                4
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(5)}>
                5
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(6)}>
                6
              </Grid>

              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(7)}>
                7
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(8)}>
                8
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={() => onClickPin(9)}>
                9
              </Grid>

              <Grid
                item
                xs={4}
                align="center"
                classes={{ root: classes.pinNumber }}
                onClick={toggleIsOpen(setIsModalOpen, isModalOpen)}
              >
                Cancel
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={onClickDel}>
                Del
              </Grid>
              <Grid item xs={4} align="center" classes={{ root: classes.pinNumber }} onClick={onClickOk}>
                OK
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </>
  );
};

SuggestionList.propTypes = {};

export default SuggestionList;
