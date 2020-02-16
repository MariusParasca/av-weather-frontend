import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TextField, Button } from '@material-ui/core';

import { isEmailValid } from 'utils/validators';
import { updateTextField } from 'utils/helperFunctions';
import { REGISTER } from 'store/actionTypes/authActionTypes';
import styles from './Register.module.css';

const Register = props => {
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
    console.log(isEmailValid(value), value);
    if (isEmailValid(value)) {
      register(value);
    } else if (!value) {
      setErrorMessage('Invalid email! Please provide a valid one');
    }
  };

  useEffect(() => {
    console.log(authData);
    if (authData.error) {
      setErrorMessage(authData.error.message);
    } else if (authData.email) {
      setHelperText('Successfully registered');
    }
  }, [authData]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
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
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authData: state.authData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: email => dispatch({ type: REGISTER, email }),
  };
};

Register.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
