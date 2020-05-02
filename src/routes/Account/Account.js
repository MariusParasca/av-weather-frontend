import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import Login from 'components/Login/Login';
// import { Button } from '@material-ui/core';
import Login from 'components/Login/Login';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { SIGN_OUT_SEND } from 'store/actionTypes/authActionTypes';
import styles from './Account.module.css';

const Account = () => {
  const authFirebase = useSelector(state => state.firebase.auth);

  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch({ type: SIGN_OUT_SEND });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {authFirebase.isEmpty ? (
          <Login />
        ) : (
          <div>
            {/* <div>Account page: </div> */}
            <Button color="primary" variant="contained" onClick={onClickLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
