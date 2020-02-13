import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Notification = props => {
  const { isOpen, handleClose, color, text } = props;

  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} color={color}>
        {text}
      </MuiAlert>
    </Snackbar>
  );
};

Notification.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  color: PropTypes.string,
  text: PropTypes.string,
};

Notification.defaultProps = {
  color: 'error',
  text: 'Error getting the weather data!',
};

export default Notification;
