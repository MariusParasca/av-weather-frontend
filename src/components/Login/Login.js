import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { isEmailValid } from 'utils/validators';
import { updateTextField, resetTextFieldError, setTextFieldError } from 'utils/helperFunctions';
import { LOGIN_SEND, REGISTER_SEND, SIGN_OUT_SEND } from 'store/actionTypes/authActionTypes';
import Spinner from 'components/Spinner/Spinner';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [helperTextEmail, setHelperTextEmail] = useState('');

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [helperTextPassword, setHelperTextPassword] = useState('');

  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const authFirebaseRedux = useSelector(state => state.firebase);
  const authFirebase = authFirebaseRedux.auth;

  console.log('authFirebase', authFirebase);

  useEffect(() => {
    if (auth.error) {
      setApiErrorMessage(auth.error);
    }
  }, [auth.error]);

  const onBlur = () => {
    if (!isEmailValid(email)) {
      setTextFieldError(setErrorEmail, setHelperTextEmail, 'Invalid email! Please provide a valid one');
    }
  };

  const onClickRegister = () => {
    if (isEmailValid(email)) {
      dispatch({ type: REGISTER_SEND, email, password });
      setApiErrorMessage('');
    } else if (!email) {
      setTextFieldError(setErrorEmail, setHelperTextEmail, 'Invalid email! Please provide a valid one');
    }
  };

  const onClickLogin = () => {
    if (isEmailValid(email)) {
      dispatch({ type: LOGIN_SEND, email, password });
      setApiErrorMessage('');
    } else if (!email) {
      setTextFieldError(setErrorEmail, setHelperTextEmail, 'Invalid email! Please provide a valid one');
    }
  };

  const onClickLogout = () => {
    dispatch({ type: SIGN_OUT_SEND });
  };

  return (
    <>
      {authFirebase.isEmpty ? (
        <>
          <Typography variant="h3" gutterBottom align="center">
            Login/Register
          </Typography>
          <div className={styles.textField}>
            <TextField
              variant="outlined"
              label="Email"
              value={email}
              onChange={updateTextField(
                setEmail,
                () => resetTextFieldError(setErrorEmail, setHelperTextEmail),
                errorEmail,
              )}
              onBlur={onBlur}
              error={errorEmail}
              helperText={helperTextEmail}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              value={password}
              onChange={updateTextField(
                setPassword,
                () => resetTextFieldError(setErrorPassword, setHelperTextPassword),
                errorPassword,
              )}
              onBlur={onBlur}
              error={errorPassword}
              helperText={helperTextPassword}
            />
          </div>
          {apiErrorMessage && (
            <Typography color="error" gutterBottom>
              {apiErrorMessage}
            </Typography>
          )}
          <div className={styles.buttonsContainer}>
            <div className={styles.button}>
              <Button color="primary" variant="contained" onClick={onClickLogin}>
                Login
              </Button>
            </div>
            <div className={styles.button}>
              <Button color="primary" variant="contained" onClick={onClickRegister}>
                Register
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Button color="primary" variant="contained" onClick={onClickLogout}>
          Logout
        </Button>
      )}
      {auth.pending ? <Spinner /> : null}
    </>
  );
};

export default Login;
