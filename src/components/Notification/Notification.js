import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_NOTIFICATION } from 'store/actionTypes/notificationActionTypes';

const Notification = () => {
  const dispatch = useDispatch();

  const notificationRedux = useSelector(state => state.notification);

  const onCloseError = useCallback(() => {
    dispatch({ type: CLOSE_NOTIFICATION });
  }, [dispatch]);

  return (
    <Snackbar open={notificationRedux.open} autoHideDuration={6000} onClose={onCloseError}>
      <MuiAlert elevation={6} variant="filled" severity={notificationRedux.status} onClose={onCloseError}>
        {notificationRedux.message}
      </MuiAlert>
    </Snackbar>
  );
};

Notification.propTypes = {};

export default Notification;
