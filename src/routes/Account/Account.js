import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LOGOUT } from 'store/actionTypes/authActionTypes';
import Login from 'components/Login/Login';
import { Button } from '@material-ui/core';
import styles from './Account.module.css';

const Account = props => {
  const { isLoggedIn, logout, user } = props;

  const onClickLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
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
      </div>
    </div>
  );
};

Account.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
};

Account.defaultProps = {
  user: null,
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authData.isLoggedIn,
    user: state.authData.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
