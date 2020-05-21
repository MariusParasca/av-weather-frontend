import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const ButtonWithSpinner = props => {
  const { loading, disabled, variant, color, classesButton, classNameSpinner, onClick, children, startIcon } = props;

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        startIcon={startIcon}
        disabled={loading || disabled}
        variant={variant}
        color={color}
        classes={classesButton}
        onClick={onClick}
      >
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={`${classes.buttonProgress} ${classNameSpinner}`} />}
    </div>
  );
};

ButtonWithSpinner.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  classesButton: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  classNameSpinner: PropTypes.string,
  startIcon: PropTypes.node,
};

ButtonWithSpinner.defaultProps = {
  loading: false,
  disabled: false,
  variant: 'outlined',
  color: 'primary',
  classesButton: {},
  onClick: () => {},
  classNameSpinner: '',
  startIcon: undefined,
};

export default ButtonWithSpinner;
