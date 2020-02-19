import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';

import { isEmailValid } from 'utils/validators';
import { updateTextField } from 'utils/helperFunctions';
import { LOGIN } from 'store/actionTypes/authActionTypes';
import Spinner from 'components/Spinner/Spinner';
import styles from './Login.module.css';

const Login = props => {
  const { register, authData } = props;

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
      register(value);
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

const mapStateToProps = state => {
  return {
    authData: state.authData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: email => dispatch({ type: LOGIN, email }),
  };
};

Login.propTypes = {
  register: PropTypes.func.isRequired,
  authData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
