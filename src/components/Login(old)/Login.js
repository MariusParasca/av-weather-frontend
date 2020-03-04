import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { TextField, Button, Typography } from '@material-ui/core';

import { isEmailValid } from 'utils/validators';
import { updateTextField } from 'utils/helperFunctions';
import { PageRoute } from 'utils/routes';
import { NavLink } from 'react-router-dom';
import styles from './Login.module.css';

const Login = props => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

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
      // register(value);
    } else if (!value) {
      setErrorMessage('Invalid email! Please provide a valid one');
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom align="center">
        Login
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
      <Typography variant="body1">
        Don&apos;t you have a account? Please <NavLink to={PageRoute.register}>register</NavLink>
      </Typography>
      <div className={styles.button}>
        <Button variant="contained" onClick={onClickRegister}>
          Login
        </Button>
      </div>
    </>
  );
};

Login.propTypes = {};

export default Login;
