import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import Login from 'components/Login/Login';
// import { Button } from '@material-ui/core';
import styles from './Account.module.css';

const Account = () => {
  // const isLoggedIn = useSelector(state => state.authData.isLoggedIn);
  // const user = useSelector(state => state.authData.user);
  // const dispatch = useDispatch();

  // const onClickLogout = () => {
  //   dispatch({ type: LOGOUT });
  // };

  return (
    <div className={styles.container}>
      {/* <div className={styles.formContainer}>
        {!isLoggedIn ? (
          <Login />
        ) : (
          <div>
            <div>Account page: {user.email}</div>
            <Button variant="contained" onClick={onClickLogout}>
              Logout
            </Button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Account;
