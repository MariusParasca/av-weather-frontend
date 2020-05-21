import React, { useCallback, useState } from 'react';
// import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { TextField, makeStyles } from '@material-ui/core';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import { POST_SUGGESTION_SEND, UP_VOTE_SUGGESTION_SEND } from 'store/actionTypes/suggestionActionTypes';
import { updateTextField, setTextFieldError } from 'utils/helperFunctions';
import { getSuggestionsDB } from 'utils/stateGetters';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { getSuggestionsQuery } from 'utils/firestoreQueries';
import Spinner from 'components/Spinner/Spinner';
import Suggestion from './Suggestion/Suggestion';
import styles from './SuggestionList.module.css';

const useStyles = makeStyles(() => ({
  input: {
    padding: '10px 14px',
  },
  textField: {
    marginRight: '10px',
  },
}));

const SuggestionList = () => {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [helperText, setHelperText] = useState('');
  const [errorText, setErrorText] = useState(false);

  const dispatch = useDispatch();

  useFirestoreConnect(getSuggestionsQuery());

  const authFirebase = useSelector(state => state.firebase.auth);

  const suggestions = useSelector(state => state.suggestions);

  const suggestionsDB = useSelector(getSuggestionsDB);

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

  return (
    <div className={styles.container}>
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
                  key={suggestion.text}
                  votes={suggestion.votes}
                  text={suggestion.text}
                  upVote={() => onUpVote(index)}
                  downVote={() => onDownVote(index)}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

SuggestionList.propTypes = {};

export default SuggestionList;
