import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  // buttonSuccess: {
  //   backgroundColor: green[500],
  //   '&:hover': {
  //     backgroundColor: green[700],
  //   },
  // },
  fabProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: -10,
    left: -10,
    zIndex: 1,
  },
}));

const IconButtonWithSpinner = props => {
  const { iconButtonClasses, onClick, loading, spinnerSize, classNameSpinner, children } = props;

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <IconButton disabled={loading} classes={iconButtonClasses} onClick={onClick}>
        {children}
      </IconButton>
      {loading && <CircularProgress size={spinnerSize} className={`${classes.fabProgress} ${classNameSpinner}`} />}
    </div>
  );
};

IconButtonWithSpinner.propTypes = {
  iconButtonClasses: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  spinnerSize: PropTypes.number,
  classNameSpinner: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

IconButtonWithSpinner.defaultProps = {
  iconButtonClasses: {},
  loading: false,
  onClick: () => {},
  classNameSpinner: '',
  spinnerSize: 68,
};

export default IconButtonWithSpinner;
