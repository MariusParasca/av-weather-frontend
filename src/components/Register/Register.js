import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Button } from '@material-ui/core';
import styles from './Register.module.css';

const Register = props => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.textField}>
          <TextField variant="outlined" label="Email" />
        </div>
        <div className={styles.button}>
          <Button variant="contained">Register</Button>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
