import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';

import { isEmailValid } from 'utils/validators';
import { updateTextField } from 'utils/helperFunctions';
import { LOGIN } from 'store/actionTypes/authActionTypes';
import Spinner from 'components/Spinner/Spinner';
import styles from './Login.module.css';

const Login = () => {
  const authData = useSelector(state => state.authData);

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const dispatch = useDispatch();

  const resetError = () => {
    setError(false);
    setHelperText('');
  };

  const setErrorMessage = message => {
    setError(true);
    setHelperText(message);
  };

  const onBlur = () => {
    if (!isEmailValid(value)) {
      setErrorMessage('Invalid email! Please provide a valid one');
    }
  };

  const onClickRegister = () => {
    if (isEmailValid(value)) {
      dispatch({ type: LOGIN, email: value });
    } else if (!value) {
      setErrorMessage('Invalid email! Please provide a valid one');
    }
  };

  useEffect(() => {
    if (authData.error) {
      setErrorMessage(authData.error.message);
    }
  }, [authData]);

  return (
    <>
      <Typography variant="h3" gutterBottom align="center">
        Login/Register
      </Typography>
      <div className={styles.textField}>
        <TextField
          variant="outlined"
          label="Email"
          value={value}
          onChange={updateTextField(setValue, resetError, error)}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
        />
      </div>
      <div className={styles.button}>
        <Button variant="contained" onClick={onClickRegister}>
          Login
        </Button>
      </div>
      {authData.pending ? <Spinner /> : null}
    </>
  );
};

export default Login;
