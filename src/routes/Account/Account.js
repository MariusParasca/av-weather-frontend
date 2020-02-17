import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Register from 'components/Login/Login';
import Login from 'components/Login(old)/Login';
import { Redirect, Route } from 'react-router-dom';
import { PageRoute } from 'utils/routes';
import styles from './Account.module.css';

const Account = props => {
  const { user } = props;

  console.log(user);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {!user ? <Redirect to={PageRoute.login} /> : null}
        <Route exact path={PageRoute.login}>
          <Register />
        </Route>
      </div>
    </div>
  );
};

Account.propTypes = {};

const mapStateToProps = state => {
  return {
    user: state.authData.user,
  };
};

export default connect(mapStateToProps)(Account);
