import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import Login from 'components/Login/Login';
// import { Button } from '@material-ui/core';
import Login from 'components/Login/Login';
import { Button } from '@material-ui/core';
import styles from './Account.module.css';

const Account = () => {
  const onClickLogout = () => {
    console.log('log out');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {!false ? (
          <Login />
        ) : (
          <div>
            <div>Account page: </div>
            <Button variant="contained" onClick={onClickLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
